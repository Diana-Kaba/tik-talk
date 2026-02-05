import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from './auth';

export const canActivateAuth: CanActivateFn = () => {
  const isLoggedIn = inject(Auth).isLoggedIn;
  const router = inject(Router);

  if (isLoggedIn) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};