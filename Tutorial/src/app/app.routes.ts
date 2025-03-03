import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { registerLocaleData } from '@angular/common';
import { RegisterComponent } from './components/register/register.component';
import { PipesDemoComponentComponent } from './components/pipes-demo-component/pipes-demo-component.component';
import { CustomDirectivesComponent } from './components/custom-directives/custom-directives.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LogoutComponent } from './components/logout/logout.component';
import { AddBookComponent } from './components/add-book/add-book.component';

export const routes: Routes = [
    {
        path: 'home', component:HomeComponent
    },
    {
        path: 'login-page', component:LoginComponent
    },
    {
        path: 'registration-page', component: RegistrationComponent
    },
    {
        path : 'pipes' , component: PipesDemoComponentComponent
   },
   {
    path : 'directives', component: CustomDirectivesComponent
   },
   {
    path: 'logout' , component: LogoutComponent
   },
   {
    path : 'add-book', component: AddBookComponent
   }
];
