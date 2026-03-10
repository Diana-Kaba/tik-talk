import { Component, inject, Input } from '@angular/core';
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
  @Input() userId?: number;

  ngOnInit() {
    this.userService.getTestPosts().subscribe((val) => {
      if (this.userId) this.posts = val.filter((post) => post.user_id === this.userId);
      else this.posts = val;
    });
  }
}
