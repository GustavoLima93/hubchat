import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'chat/:action',
    loadChildren: () => import('./pages/login-signin/login-signin.module').then(m => m.LoginSigninModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
  },
  {
    path: '',
    redirectTo: 'chat',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
