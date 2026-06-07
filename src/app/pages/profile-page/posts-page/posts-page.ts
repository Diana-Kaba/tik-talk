import { Component, inject, Input } from '@angular/core';
import { UsersService } from '../../../services/usersservice';
import { IPost } from '../../../interfaces/ipost';
import { SvgIcon } from '../../../common/svg-icon/svg-icon';

@Component({
  selector: 'app-posts-page',
  imports: [SvgIcon],
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

  onDeletePost(postId: number) {
    const isAgree: boolean = confirm('Видалити пост?');

    if (isAgree) {
      this.userService.deletePost(postId).subscribe({
        next: () => {
          // не треба перезавантаження
          this.posts = this.posts.filter((post) => post.id !== postId);
        },
      });
    }
  }
}
