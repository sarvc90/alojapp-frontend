import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login/login.component';
import { RegisterPageComponent } from './pages/register/register.component';

const routes: Routes = [
  { path: '', component: LoginPageComponent },         // /auth
  { path: 'login', component: LoginPageComponent },    // /auth/login
  { path: 'register', component: RegisterPageComponent } // /auth/register
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}