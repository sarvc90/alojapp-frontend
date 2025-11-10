import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login-page',
  template: `
    <app-auth-template title="Bienvenido de vuelta" subtitle="Inicia sesión para continuar">
      <div *ngIf="errorMessage"
           class="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
        <p class="text-red-700 text-sm">{{ errorMessage }}</p>
      </div>

      <form [formGroup]="form" (ngSubmit)="onSubmit()" class="flex flex-col gap-4 w-full">

        <!-- Campo: Correo electrónico o teléfono -->
        <div>
          <label class="block text-sm font-normal text-gray-700 mb-2">
            Correo electrónico o teléfono
          </label>
          <app-molecule-form-field
              placeholder="tu.email@example.com"
              [control]="usernameControl">
          </app-molecule-form-field>
        </div>

        <!-- Campo: Contraseña -->
        <div>
          <div class="flex justify-between items-center mb-2">
            <label class="block text-sm font-normal text-gray-700">
              Contraseña
            </label>
            <a
                class="text-sm text-[#46828a] hover:text-[#3a6d73] cursor-pointer"
                (click)="onForgot()">
              Olvidaste la contraseña?
            </a>
          </div>
          <app-molecule-form-field
              placeholder="Tu contraseña"
              type="password"
              [control]="passwordControl">
          </app-molecule-form-field>
        </div>

        <!-- Botón principal -->
        <button
            type="submit"
            class="w-full bg-[#46828a] hover:bg-[#3a6d73] text-white font-semibold py-3 rounded-md transition-colors duration-200 focus:outline-none focus:ring-0 shadow-none">
          Iniciar sesión
        </button>

        <!-- Separador -->
        <div class="flex items-center my-2">
          <hr class="flex-grow border-gray-300" />
          <span class="mx-2 text-gray-500">o</span>
          <hr class="flex-grow border-gray-300" />
        </div>

        <!-- Botón secundario -->
        <button
            type="button"
            (click)="navigateToRegister()"
            class="w-full border border-[#46828a] bg-[#46828a] hover:bg-[#3a6d73] text-white font-semibold py-3 rounded-md transition-colors duration-200 focus:outline-none focus:ring-0 shadow-none">
          Crear cuenta
        </button>
      </form>
    </app-auth-template>
  `,
  styles: [`
    :host ::ng-deep input:focus,
    :host ::ng-deep button:focus {
      outline: none !important;
      box-shadow: none !important;
      border-color: inherit !important;
    }
    :host ::ng-deep button {
      box-shadow: none !important;
    }
  `]
})
export class LoginPageComponent {
  form: FormGroup;
  errorMessage?: string;

  constructor(
      private fb: FormBuilder,
      private auth: AuthService,
      private router: Router
  ) {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get usernameControl() {
    return this.form.get('username') as any;
  }

  get passwordControl() {
    return this.form.get('password') as any;
  }

  onSubmit() {
    if (this.form.valid) {
      this.auth.login(this.form.value).subscribe({
        next: () => {
          console.log('Login correcto');
          // Aquí puedes redirigir al dashboard u otra página
          // this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          if (error.status === 401) {
            this.errorMessage = 'Usuario o contraseña incorrectos';
          } else {
            this.errorMessage = 'Error al iniciar sesión. Por favor intenta nuevamente';
          }
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  onForgot() {
    console.log('forgot password');
    // Aquí puedes implementar la funcionalidad de recuperación de contraseña
  }

  navigateToRegister() {
    this.router.navigate(['/auth/register']);
  }
}