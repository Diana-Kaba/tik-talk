import { Component, inject } from '@angular/core';
import { SvgIcon } from '../svg-icon/svg-icon';
import { SubscriberCard } from './subscriber-card/subscriber-card';
import { RouterLink } from '@angular/router';
import { UsersService } from '../../services/usersservice';
import { IUser } from '../../interfaces/iuser';

@Component({
  selector: 'app-sidebar-component',
  imports: [SvgIcon, SubscriberCard, RouterLink],
  templateUrl: './sidebar-component.html',
  styleUrl: './sidebar-component.scss',
})
export class SidebarComponent {
  usersService = inject(UsersService);
  users: IUser[] = [];
  subscribers = this.usersService.getTestAccounts().subscribe((val) => {
    this.users = val;
  });

  me: IUser | null = null;

  ngOnInit() {
    this.me = this.usersService.getMe();
    this.loadList();
    this.usersService.subscriptionChanged.subscribe(() => {
      this.loadList();
    });
  }

  loadList() {
    if (this.me) {
      this.usersService.getSubscriptions(this.me.id).subscribe((val) => {
        this.users = val;
      });
    }
  }
}
