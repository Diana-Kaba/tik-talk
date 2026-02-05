import { inject, Injectable } from '@angular/core';
import { IUser } from '../interfaces/iuser';
import { HttpClient } from '@angular/common/http';
import { Auth } from '../auth/auth';
import { of } from 'rxjs';
import { IPost } from '../interfaces/ipost';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  http = inject(HttpClient);
  auth = inject(Auth);

  getTestAccounts() {
    return this.http.get<IUser[]>('https://jsonplaceholder.typicode.com/users');
  }

  getMe(): IUser | null {
    const saved = localStorage.getItem('me_profile');
    if (saved) return JSON.parse(saved) as IUser;

    const me = this.auth.currentUser;
    if (me) localStorage.setItem('me_profile', JSON.stringify(me));

    return me;
  }

  changeProfile(profile: Partial<IUser>) {
    // partial - не всі поля обов'язкові
    const current = this.getMe();
    if (!current) throw new Error('Ви не зареєстровані');;

    const updated: IUser = {
      ...current,
      ...profile,
      address: {
        ...current.address,
        ...profile.address,
      },
    };

    localStorage.setItem('me_profile', JSON.stringify(updated));
    this.auth.saveUser(updated);

    return of(updated);
    // of - створює Observable з переданого значення
  }

  getTestPosts() {
    return this.http.get<IPost[]>('https://jsonplaceholder.typicode.com/posts/?_limit=7');
  }
}
