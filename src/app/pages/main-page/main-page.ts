import { Component, inject } from '@angular/core';
import { ProfileCard } from '../../common/profile-card/profile-card';
import { UsersService } from '../../services/usersservice';
import { IUser } from '../../interfaces/iuser';

@Component({
  selector: 'app-main-page',
  imports: [ProfileCard],
  templateUrl: './main-page.html',
  styleUrl: './main-page.scss'
})
export class MainPage {
  usersService = inject(UsersService);
  users: IUser[] = [];

  constructor() {
    this.usersService.getTestAccounts()
    .subscribe(val => {
      this.users = val;
    });
  }
}
