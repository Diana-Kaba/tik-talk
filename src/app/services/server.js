const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'MySQL-8.4',
  user: 'root',
  password: '',
  database: 'tik-talk',
});

db.connect((err) => {
  if (err) {
    console.error('Помилка підключення до БД:', err);
    return;
  }
  console.log('Успішно підключено до бази даних MySQL.');
});

// запускаємо сервер
app.listen(port, () => {
  console.log(`Сервер працює на адресі: http://localhost:${port}`);
});

// отримуємо всіх користувачів
app.get('/api/users', (req, res) => {
  const sql = 'SELECT * FROM users';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// отримуємо всі пости (+ім'я, нік)
app.get('/api/posts', (req, res) => {
  const sql = `
        SELECT posts.*, users.name, users.username 
        FROM posts 
        JOIN users ON posts.user_id = users.id 
        ORDER BY posts.created_at DESC
    `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});


// авторизація користувача
app.get('/api/login', (req, res) => {
    const { username, email } = req.query;
    const sql = 'SELECT * FROM users WHERE username = ? AND email = ?';

    db.query(sql, [username, email], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// оновлюємо профіль у БД
app.patch('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    const { name, username, email, phone, city, street } = req.body;

    const sql = `
        UPDATE users 
        SET name = ?, username = ?, email = ?, phone = ?, city = ?, street = ?
        WHERE id = ?
    `;

    db.query(sql, [name, username, email, phone, city, street, userId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true });
    });
});

// отримуємо підписників
app.get('/api/users/:id/subscribers', (req, res) => {
    const sql = `
        SELECT users.* FROM users
        JOIN subscriptions ON users.id = subscriptions.follower_id
        WHERE subscriptions.followed_id = ?
    `;
    db.query(sql, [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// отримуємо підписки
app.get('/api/users/:id/subscriptions', (req, res) => {
    const sql = `
        SELECT users.* FROM users
        JOIN subscriptions ON users.id = subscriptions.followed_id
        WHERE subscriptions.follower_id = ?
    `;
    db.query(sql, [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// підписуємося
app.post('/api/subscribe', (req, res) => {
    const { follower_id, followed_id } = req.body;
    const sql = 'INSERT INTO subscriptions (follower_id, followed_id) VALUES (?, ?)';
    db.query(sql, [follower_id, followed_id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true });
    });
});

// відписуємося
app.delete('/api/unsubscribe', (req, res) => {
    const { follower_id, followed_id } = req.query;
    const sql = 'DELETE FROM subscriptions WHERE follower_id = ? AND followed_id = ?';
    db.query(sql, [follower_id, followed_id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true });
    });
});
