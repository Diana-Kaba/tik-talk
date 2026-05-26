import { Component, inject } from '@angular/core';
import { SvgIcon } from '../svg-icon/svg-icon';
import { IUser } from '../../interfaces/iuser';
import { UsersService } from '../../services/usersservice';

@Component({
  selector: 'app-post-input',
  imports: [SvgIcon],
  templateUrl: './post-input.html',
  styleUrl: './post-input.scss',
})
export class PostInput {
  usersService = inject(UsersService);
  me: IUser | null = null;

  ngOnInit() {
    this.me = this.usersService.getMe();
  }

  getAvatarUrl() {
    if (this.me && this.me.avatarUrl) {
      return `http://localhost:3000${this.me.avatarUrl}`;
    }
    return '/assets/imgs/default.jpg';
  }
}
