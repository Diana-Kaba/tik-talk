import { Component, inject, Input } from '@angular/core';
import { IUser } from '../../interfaces/iuser';
import { UsersService } from '../../services/usersservice';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile-card',
  imports: [RouterLink],
  standalone: true,
  templateUrl: './profile-card.html',
  styleUrl: './profile-card.scss',
})
export class ProfileCard {
  @Input() user!: IUser;
  usersService = inject(UsersService);
  me: IUser | null = null;
  isSubscribed = false;

  ngOnInit() {
    this.me = this.usersService.getMe();
    this.checkSubscription();
  }

  // чи ми вже підписані на цю людину
  checkSubscription() {
    if (this.me && this.me.id !== this.user.id) {
      this.usersService.getSubscriptions(this.me.id).subscribe((subs) => {
        // якщо с є id цього користувача - true
        this.isSubscribed = subs.some((s) => s.id === this.user.id);
      });
    }
  }

  toggleSubscription() {
    if (!this.me) return;

    if (this.isSubscribed) {
      this.usersService.unsubscribe(this.me.id, this.user.id).subscribe(() => {
        this.isSubscribed = false;
        this.usersService.subscriptionChanged.next();
      });
    } else {
      this.usersService.subscribe(this.me.id, this.user.id).subscribe(() => {
        this.isSubscribed = true;
        this.usersService.subscriptionChanged.next();
      });
    }
  }
}
