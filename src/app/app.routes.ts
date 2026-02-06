import { Routes } from '@angular/router';
import { LoginPage } from './pages/login-page/login-page';
import { MainPage } from './pages/main-page/main-page';
import { ProfilePage } from './pages/profile-page/profile-page';
import { Sidebar } from './pages/sidebar/sidebar';
import { canActivateAuth } from './auth/auth.guard';
import { Settings } from './pages/settings/settings';
import { Logout } from './common/logout/logout';

export const routes: Routes = [
    { path: '', component: Sidebar, canActivate: [canActivateAuth], children: [
        { path: '', component: MainPage },
        { path: 'profile', component: ProfilePage },
        { path: 'settings', component: Settings },
        { path: 'logout', component: Logout },
    ]},
    { path: 'login', component: LoginPage },
];
