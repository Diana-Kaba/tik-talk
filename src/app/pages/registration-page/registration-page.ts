import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { UsersService } from '../../services/usersservice';
import { IUser } from '../../interfaces/iuser';
import { Router, RouterLink } from '@angular/router';
import { IProfileFormControls } from '../../interfaces/iprofile';

@Component({
  selector: 'app-registration-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './registration-page.html',
  styleUrl: './registration-page.scss',
})
export class RegistrationPage {
  userService = inject(UsersService);
  router = inject(Router);
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

  onSave() {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    this.userService.registerUser(this.form.getRawValue()).subscribe({
      next: () => {
        this.message = 'Акаунт успішно створено!';
        this.isSaving = true;

        // через секунду на login
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1000);
      },
      error: () => {
        this.message = 'Помилка при реєстрації. Такий користувач уже існує.';
        this.isSaving = false;
      },
    });
  }
}
