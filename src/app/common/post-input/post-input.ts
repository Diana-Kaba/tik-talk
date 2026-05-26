import { Component, EventEmitter, inject, Output } from '@angular/core';
import { SvgIcon } from '../svg-icon/svg-icon';
import { IUser } from '../../interfaces/iuser';
import { UsersService } from '../../services/usersservice';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-post-input',
  imports: [SvgIcon, ReactiveFormsModule],
  templateUrl: './post-input.html',
  styleUrl: './post-input.scss',
})
export class PostInput {
  usersService = inject(UsersService);
  me: IUser | null = null;
  postText: string = '';
  postTitle: string = '';
  @Output() postCreated = new EventEmitter<void>();

  postForm = new FormGroup({
    title: new FormControl(''),
    text: new FormControl('', Validators.required),
  });

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
    if (this.postForm.invalid || !this.me) return;

    const formValues = this.postForm.value;

    const newPost = {
      user_id: this.me.id,
      title: formValues.title?.trim() || 'Без теми',
      body: formValues.text?.trim() || '',
    };

    this.usersService.createPost(newPost).subscribe({
      next: (res) => {
        this.postForm.reset();
        this.postCreated.emit();
      },
      error: (err) => console.error('Помилка при збереженні:', err),
    });
  }
}
