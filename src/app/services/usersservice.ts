import { inject, Injectable } from '@angular/core';
import { IUser } from '../interfaces/iuser';
import { HttpClient } from '@angular/common/http';
import { Auth } from '../auth/auth';
import { map, of, Subject } from 'rxjs';
import { IPost } from '../interfaces/ipost';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  http = inject(HttpClient);
  auth = inject(Auth);

  public subscriptionChanged = new Subject<void>();

  getTestAccounts() {
    return this.http.get<IUser[]>('http://localhost:3000/api/users');
  }

  getMe(): IUser | null {
    const me = this.auth.currentUser;
    if (me) localStorage.setItem('me_profile', JSON.stringify(me));

    return me;
  }

  changeProfile(profile: Partial<IUser>) {
    const current = this.getMe();
    if (!current) throw new Error('Ви не зареєстровані');
    const updated: IUser = { ...current, ...profile };

    return this.http.patch(`http://localhost:3000/api/users/${current.id}`, profile).pipe(
      map(() => {
        this.auth.saveUser(updated);
        return updated;
      }),
    );
  }
  // patch - запит на часткове оновлення
  // pipe - ловимо дані перед їх отриманням для застосування функцій

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
    return this.http.post('http://localhost:3000/api/subscribe', {
      follower_id: followerId,
      followed_id: followedId,
    });
  }

  unsubscribe(followerId: number, followedId: number) {
    return this.http.delete(
      `http://localhost:3000/api/unsubscribe?follower_id=${followerId}&followed_id=${followedId}`,
    );
  }

  registerUser(profile: Partial<IUser>) {
    return this.http.post('http://localhost:3000/api/register', profile);
  }

  uploadAvatar(userId: number, file: File) {
    const formData = new FormData();
    formData.append('avatar', file);

    return this.http
      .post<{
        success: boolean;
        avatarUrl: string;
      }>(`http://localhost:3000/api/users/${userId}/avatar`, formData)
      .pipe(
        map((res) => {
          const current = this.getMe();
          if (current) {
            current.avatarUrl = res.avatarUrl;
            this.auth.saveUser(current);
          }
          return res;
        }),
      );
  }
}
