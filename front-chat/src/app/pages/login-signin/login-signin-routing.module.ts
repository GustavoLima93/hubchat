import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginSigninComponent } from './components/login-signin/login-signin.component';

const routes: Routes = [
  {
    path: '',
    component: LoginSigninComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginSigninRoutingModule { }
