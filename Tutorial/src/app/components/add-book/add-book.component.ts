  import { Component, inject } from '@angular/core';
  import { AuthService } from '../../services/auth.service';
  import { HttpClient } from '@angular/common/http';
  import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
  import { CommonModule } from '@angular/common';
  import { Router } from '@angular/router';

  @Component({
    selector: 'app-add-book',
    imports: [ReactiveFormsModule, CommonModule],
    templateUrl: './add-book.component.html',
    styleUrl: './add-book.component.scss'
  })
  export class AddBookComponent {
    route = inject(Router);
    authService = inject(AuthService);
    http = inject(HttpClient);
    fb = inject(FormBuilder);
    apiUrl = "http://localhost/Access-Token/Token/add-book.php";

    bookForm : FormGroup = this.fb.group ({
      books: this.fb.array([this.createBookForm()])
    });

    get books() {
      return this.bookForm.get('books') as FormArray;
    }

    createBookForm(): FormGroup {
      return this.fb.group({
        title : ['', Validators.required],
        author : ['', Validators.required]
      });
    }

    addBookField(){
      this.books.push(this.createBookForm());
    }

    removeBooks(index : number){
      this.books.removeAt(index);
    }

    submitBooks() {
      this.http.post(this.apiUrl,this.bookForm.value, 
        {
          headers: this.authService.getAuthHeaders()
        }).subscribe((response)=> {
          console.log(response);
          alert("book added successfully");
        });
    }

    logout(){
      this.authService.logout();
      this.route.navigate(['/login-page']);
    }

  }
