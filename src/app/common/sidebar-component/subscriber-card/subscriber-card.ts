import { Component, Input } from '@angular/core';
import { IUser } from '../../../interfaces/iuser';

@Component({
  selector: 'app-subscriber-card',
  imports: [],
  templateUrl: './subscriber-card.html',
  styleUrl: './subscriber-card.scss'
})
export class SubscriberCard {
  @Input() user!: IUser;
}
