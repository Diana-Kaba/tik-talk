import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IUser } from '../interfaces/iuser';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  http = inject(HttpClient);

  private storageKey = 'currentUser';

  get isLoggedIn(): boolean {
    return !!localStorage.getItem(this.storageKey);
  }

  get currentUser(): IUser | null {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : null;
  }

  login(username: string, email: string) {
    return this.http.get<IUser[]>(
      `https://jsonplaceholder.typicode.com/users?username=${username}&email=${email}`
    );
  }

  saveUser(user: IUser) {
    localStorage.setItem(this.storageKey, JSON.stringify(user));
  }

  logout() {
    localStorage.removeItem(this.storageKey);
  }
}
