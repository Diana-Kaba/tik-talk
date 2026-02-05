import { Component, effect, inject } from '@angular/core';
import { ProfileHeader } from '../../common/profile-header/profile-header';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { UsersService } from '../../services/usersservice';
import { IUser } from '../../interfaces/iuser';
import { RouterLink } from '@angular/router';
import { IProfileFormControls } from '../../interfaces/iprofile';

@Component({
  selector: 'app-settings',
  imports: [ProfileHeader, ReactiveFormsModule, RouterLink],
  templateUrl: './settings.html',
  styleUrl: './settings.scss',
})
export class Settings {
  userService = inject(UsersService);
  profile: IUser | null = this.userService.getMe();

  fb = inject(FormBuilder);

  // nonNullable - щоб не перевіряти на null при кожному доступі до значення контролу
  
  form = this.fb.nonNullable.group<IProfileFormControls>({
    name: this.fb.nonNullable.control('', [
      Validators.required,
      Validators.pattern(/^[A-Za-zА-Яа-яІіЇїЄєҐґ\s']+$/),
    ]),
    username: this.fb.nonNullable.control('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9._-]+$/),
    ]),
    email: this.fb.nonNullable.control('', [Validators.required, Validators.email]),
    phone: this.fb.nonNullable.control('', [
      Validators.required,
      Validators.pattern(/^(\+380|0)\d{9}$/),
    ]),
    site: this.fb.nonNullable.control('', [
      Validators.pattern(/^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/),
    ]),
    address: this.fb.nonNullable.group({
      street: this.fb.nonNullable.control('', []),
      suite: this.fb.nonNullable.control('', []),
      city: this.fb.nonNullable.control('', []),
      zipcode: this.fb.nonNullable.control('', [
        Validators.pattern(/^\d{5}$/),
      ]),
    }),
  });

  constructor() {
    effect(() => {
      const user = this.userService.getMe();
      if (user) this.form.patchValue(user);
    });
  }

  onSave() {
    if (this.form.invalid || !this.profile) return;

    this.userService.changeProfile(this.form.getRawValue()).subscribe((val: IUser | null) => {
      if (val) this.profile = val;
    });
  }
}
