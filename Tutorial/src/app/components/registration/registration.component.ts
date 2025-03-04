import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent{
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);
  isLoading = false;

  registerForm : FormGroup = this.fb.group ({
    name : ['', Validators.required],
    email : ['', [Validators.required, Validators.email]],
    password : ['', [Validators.required, Validators.minLength(8)]]
  });

  message : string = '';

  register() {
    if (this.registerForm.valid){
      this.authService.register(this.registerForm.value).subscribe(
        (response)=> {
          this.message = response.message;
          this.isLoading = true;
          this.message = "Redirecting to Login-Page!";
          setTimeout(()=>{
            this.router.navigate(['/login-page']);
          }, 2000)
          
        },
        ()=> {
          this.message = "Registration Failed!";
        }
      );
    }
  }
  
}
