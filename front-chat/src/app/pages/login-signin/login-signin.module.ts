import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginSigninRoutingModule } from './login-signin-routing.module';
import { LoginSigninComponent } from './components/login-signin/login-signin.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LoginSigninComponent
  ],
  imports: [
    CommonModule,
    LoginSigninRoutingModule,
    ReactiveFormsModule
  ]
})
export class LoginSigninModule { }
