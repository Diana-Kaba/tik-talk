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

// запускаємо сервера
app.listen(port, () => {
  console.log(`Сервер працює на адресі: http://localhost:${port}`);
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
