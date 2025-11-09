import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login-page',
  template: `
    <app-auth-template title="Bienvenido de vuelta" subtitle="Inicia sesión para continuar" logo="assets/logo.png">
      <app-organism-login-form [form]="form" (submitForm)="onSubmit()" (forgotPassword)="onForgot()"></app-organism-login-form>
    </app-auth-template>
  `
})
export class LoginPageComponent {
  form: FormGroup;
  error?: string;

  constructor(private fb: FormBuilder, private auth: AuthService) {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.auth.login(this.form.value).subscribe({
        next: () => { console.log('Login correcto'); },
        error: () => { this.error = 'Usuario o contraseña incorrectos'; }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  onForgot() {
    console.log('forgot password');
  }
}
