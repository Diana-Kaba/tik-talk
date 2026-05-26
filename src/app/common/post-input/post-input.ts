import { Component, inject } from '@angular/core';
import { SvgIcon } from '../svg-icon/svg-icon';
import { IUser } from '../../interfaces/iuser';
import { UsersService } from '../../services/usersservice';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-post-input',
  imports: [SvgIcon, FormsModule],
  templateUrl: './post-input.html',
  styleUrl: './post-input.scss',
})
export class PostInput {
  usersService = inject(UsersService);
  me: IUser | null = null;
  postText: string = '';
  postTitle: string = '';

  ngOnInit() {
    this.me = this.usersService.getMe();
  }

  getAvatarUrl() {
    if (this.me && this.me.avatarUrl) {
      return `http://localhost:3000${this.me.avatarUrl}`;
    }
    return '/assets/imgs/default.jpg';
  }

  onSendPost() {
    // чи пост не порожній (мінус пробіли по краях)
    if (!this.postText.trim() || !this.me) {
      return;
    }

    const newPost = {
      user_id: this.me.id,
      title: this.postTitle,
      body: this.postText,
    };

    this.usersService.createPost(newPost).subscribe({
      next: (res) => {
        this.postText = '';
        this.postTitle = '';
      },
      error: (err) => console.error('Помилка при збереженні:', err),
    });
  }
}
