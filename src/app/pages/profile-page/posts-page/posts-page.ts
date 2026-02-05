import { Component, inject } from '@angular/core';
import { UsersService } from '../../../services/usersservice';
import { IPost } from '../../../interfaces/ipost';

@Component({
  selector: 'app-posts-page',
  imports: [],
  templateUrl: './posts-page.html',
  styleUrl: './posts-page.scss',
})
export class PostsPage {
  userService = inject(UsersService);
  posts: IPost[] = [];
  constructor() {
    this.userService.getTestPosts().subscribe((val) => {
      this.posts = val;
    });
  }
}
