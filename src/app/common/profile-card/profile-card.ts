import { Component, Input } from '@angular/core';
import { IUser } from '../../interfaces/iuser';

@Component({
  selector: 'app-profile-card',
  imports: [],
  standalone: true,
  templateUrl: './profile-card.html',
  styleUrl: './profile-card.scss'
})
export class ProfileCard {
  @Input() user!: IUser;
}
