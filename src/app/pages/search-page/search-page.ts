import { Component, inject } from '@angular/core';
import { ProfileCard } from '../../common/profile-card/profile-card';
import { UsersService } from '../../services/usersservice';
import { IUser } from '../../interfaces/iuser';

@Component({
  selector: 'app-search-page',
  imports: [ProfileCard],
  templateUrl: './search-page.html',
  styleUrl: './search-page.scss'
})
export class SearchPage {
  usersService = inject(UsersService);
  users: IUser[] = [];

  constructor() {
    this.usersService.getTestAccounts()
    .subscribe(val => {
      this.users = val;
    });
  }
}
