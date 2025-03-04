import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, ReactiveFormsModule, RouterLink]
})
export class LoginComponent {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  route = inject(Router);

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  message: string = '';

  login() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        (response) => {
          this.message = response.message;
          if (response.token) {
            localStorage.setItem('token', response.token);
            this.route.navigate(['/add-book']);
          }
        },
        () => {
          this.message = 'Invalid Credential !';
        }
      );
    }
  }
}
