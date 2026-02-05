import { Component, inject } from '@angular/core';
import { Auth } from '../../auth/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  imports: [],
  templateUrl: './logout.html',
  styleUrl: './logout.scss',
})
export class Logout {
  auth = inject(Auth);
  router = inject(Router);

  constructor() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
