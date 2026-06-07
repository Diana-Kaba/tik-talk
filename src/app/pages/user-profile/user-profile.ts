import { Component, inject } from '@angular/core';
import { UsersService } from '../../services/usersservice';
import { IUser } from '../../interfaces/iuser';
import { PostsPage } from '../profile-page/posts-page/posts-page';
import { ProfileHeader } from '../../common/profile-header/profile-header';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  imports: [PostsPage, ProfileHeader],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.scss',
})
export class UserProfile {
  route = inject(ActivatedRoute);
  user!: IUser;
  usersService = inject(UsersService);
  profile: IUser | null = this.usersService.getMe();
  isSubscribed = false;

  ngOnInit() {
    // якщо id зміниться, сторінка оновиться
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      if (id) {
        this.usersService.getUserById(id).subscribe((user) => {
          this.user = user;
          this.checkSubscription();
        });
      }
    });
  }

  checkSubscription() {
    if (this.profile && this.profile.id !== this.user.id) {
      this.usersService.getSubscriptions(this.profile.id).subscribe((subs) => {
        this.isSubscribed = subs.some((s) => s.id === this.user.id);
      });
    }
  }

  toggleSubscription() {
    if (!this.profile) return;

    if (this.isSubscribed) {
      this.usersService.unsubscribe(this.profile.id, this.user.id).subscribe(() => {
        this.isSubscribed = false;
        this.usersService.subscriptionChanged.next();
      });
    } else {
      this.usersService.subscribe(this.profile.id, this.user.id).subscribe(() => {
        this.isSubscribed = true;
        this.usersService.subscriptionChanged.next();
      });
    }
  }
}
