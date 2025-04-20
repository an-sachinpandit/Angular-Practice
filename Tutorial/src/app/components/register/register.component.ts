import { Component, OnInit } from '@angular/core';
import { FormGroup , FormBuilder, Validators, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit{
      registrationForm! : FormGroup;

      constructor( private fb : FormBuilder){



      }

      ngOnInit(): void {
        
        this.initForm();

        this.registrationForm.valueChanges.subscribe((data)=>{
          console.log(this.registrationForm.controls)
        })
      }

      initForm() {
        this.registrationForm = this.fb.group({
          name: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(50)]],
          age: ['', [Validators.required, Validators.min(18), Validators.max(100)]],
          color: ['', Validators.required],
          Email: ['', [Validators.required, Validators.email]],
          phone: ['', Validators.required]

        });

        this.formChangeListener()
      }

      checkError(controlName: string, errorType: string) {
        console.log(this.registrationForm.get(controlName)?.errors, this.registrationForm.get(controlName)?.errors && (this.registrationForm.get(controlName)?.errors)![errorType])
        return this.registrationForm.get(controlName)?.errors
      }

      formChangeListener() {
        this.registrationForm.valueChanges.subscribe({
          next: (data) => {
            console.log(data)
          },
          error:(error) => {
            console.log(error)
          }
        })
      }


}
