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
    return this.http.get<IUser[]>('http://localhost:3000/api/users');
  }

  getMe(): IUser | null {
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
    };

    this.auth.saveUser(updated);

    return of(updated);
    // of - створює Observable з переданого значення
  }

  getTestPosts() {
    return this.http.get<IPost[]>('http://localhost:3000/api/posts');
  }

  getSubscribers(userId: number) {
    return this.http.get<IUser[]>(`http://localhost:3000/api/users/${userId}/subscribers`);
  }

  getSubscriptions(userId: number) {
    return this.http.get<IUser[]>(`http://localhost:3000/api/users/${userId}/subscriptions`);
  }

  subscribe(followerId: number, followedId: number) {
    return this.http.post('http://localhost:3000/api/subscribe', { follower_id: followerId, followed_id: followedId });
  }

  unsubscribe(followerId: number, followedId: number) {
    return this.http.delete(`http://localhost:3000/api/unsubscribe?follower_id=${followerId}&followed_id=${followedId}`);
  }
}
