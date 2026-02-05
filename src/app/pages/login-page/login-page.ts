import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../auth/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {
  authService = inject(Auth);

  form = new FormGroup({
    username: new FormControl('', {
      validators: [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._-]+$/),
      ],
    }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
  });

  router = inject(Router);

  onSubmit() {
    if (this.form.valid) {
      const rawForm = this.form.getRawValue();

      this.authService.login(rawForm.username!, rawForm.email!).subscribe((users) => {
        if (users.length > 0) {
          const user = users[0];

          this.authService.saveUser(user);
          this.router.navigate(['']);
        }
      });
    }
  }
}
