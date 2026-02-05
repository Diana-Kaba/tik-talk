import { Component, inject } from '@angular/core';
import { ProfileHeader } from "../../common/profile-header/profile-header";
import { UsersService } from '../../services/usersservice';
import { IUser } from '../../interfaces/iuser';
import { SvgIcon } from "../../common/svg-icon/svg-icon";
import { RouterLink } from "@angular/router";
import { PostsPage } from "./posts-page/posts-page";

@Component({
  selector: 'app-profile-page',
  imports: [ProfileHeader, SvgIcon, RouterLink, PostsPage],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.scss',
})
export class ProfilePage {
  userService = inject(UsersService);
  profile: IUser | null = this.userService.getMe();
}
