import { Component, inject } from '@angular/core';
import { ProfileHeader } from '../../common/profile-header/profile-header';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { UsersService } from '../../services/usersservice';
import { IUser } from '../../interfaces/iuser';
import { RouterLink } from '@angular/router';
import { IProfileFormControls } from '../../interfaces/iprofile';
import { SvgIcon } from '../../common/svg-icon/svg-icon';

@Component({
  selector: 'app-settings',
  imports: [ProfileHeader, ReactiveFormsModule, RouterLink, SvgIcon],
  templateUrl: './settings.html',
  styleUrl: './settings.scss',
})
export class Settings {
  userService = inject(UsersService);
  profile: IUser | null = this.userService.getMe();
  message: string | null = null;
  isSaving = false;

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
    city: this.fb.nonNullable.control('', []),
    street: this.fb.nonNullable.control('', []),
  });

  constructor() {
    // pаповнюємо форму при завантаженні
    if (this.profile) this.form.patchValue(this.profile);
  }
  onSave() {
    this.form.markAllAsTouched(); // вивести всі помилки валідації
    if (this.form.invalid || !this.profile) return;

    this.userService.changeProfile(this.form.getRawValue()).subscribe((val: IUser | null) => {
      if (val) {
        this.profile = val;
        this.message = 'Профіль успішно збережено!';
        this.isSaving = true;
      } else {
        this.message = 'Помилка при збереженні профілю. Спробуйте ще раз.';
        this.isSaving = false;
      }
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const userId = this.profile?.id;

      if (userId) {
        this.userService.uploadAvatar(userId, file).subscribe((res) => {
          if (this.profile) {
            this.profile.avatarUrl = res.avatarUrl;
          }
        });
      }
    }
  }
  getAvatarUrl() {
    if (this.profile && this.profile.avatarUrl) {
      return `http://localhost:3000${this.profile.avatarUrl}`;
    }
    return '/assets/imgs/default.jpg';
  }

  onDeleteAvatar() {
    const isAgree: boolean = confirm("Видалити аватар?");
    if (this.profile && this.profile.avatarUrl && isAgree) {
      this.userService.deleteAvatar(this.profile.id).subscribe({
        next: () => {
          if (this.profile) this.profile.avatarUrl = undefined;
        },
        error: (err) => {
          console.error('Помилка видалення аватара', err);
        },
      });
    }
  }
}
