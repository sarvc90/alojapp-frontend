import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginPageComponent } from './pages/login/login.component';
import { AtomicModule } from '../../atomic/atomic.module';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [
    LoginPageComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AtomicModule,
    AuthRoutingModule,   // ✅ IMPORTANTE
  ]
})
export class AuthModule {}
