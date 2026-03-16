import { Component, inject } from '@angular/core';
import { ProfileCard } from '../../common/profile-card/profile-card';
import { UsersService } from '../../services/usersservice';
import { IUser } from '../../interfaces/iuser';

@Component({
  selector: 'app-main-page',
  imports: [ProfileCard],
  templateUrl: './main-page.html',
  styleUrl: './main-page.scss',
})
export class MainPage {
  usersService = inject(UsersService);
  users: IUser[] = [];
  me: IUser | null = null;

  ngOnInit() {
    this.me = this.usersService.getMe();

    this.usersService.getTestAccounts().subscribe((val) => {
      if (this.me) this.users = val.filter((user) => user.id !== this.me!.id);
      else this.users = val;
    });
  }
}
