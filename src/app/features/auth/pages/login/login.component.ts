import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login-page',
  template: `
    <app-auth-template title="Bienvenido de vuelta" subtitle="Inicia sesión para continuar">

      <!-- Mensaje de error -->
      <div *ngIf="errorMessage"
           class="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
        <p class="text-red-700 text-sm">{{ errorMessage }}</p>
      </div>

      <!-- Formulario de login -->
      <form [formGroup]="form" (ngSubmit)="onSubmit()" class="flex flex-col gap-4 w-full">

        <!-- Campo: Correo electrónico -->
        <div>
          <label class="block text-sm font-normal text-gray-700 mb-2">
            Correo electrónico
          </label>
          <input
              type="email"
              formControlName="email"
              placeholder="tu.email@example.com"
              class="w-full px-4 py-3 bg-white border border-[#46828a] rounded-md text-base text-gray-700 placeholder-gray-400
                   focus:outline-none focus:border-[#46828a] focus:ring-0 transition-colors duration-200"
              [class.border-red-500]="emailControl.invalid && emailControl.touched"
          />
          <div *ngIf="emailControl.invalid && emailControl.touched" class="mt-1.5 text-xs text-red-600">
            <span *ngIf="emailControl.hasError('required')">El correo es requerido</span>
            <span *ngIf="emailControl.hasError('email')">Ingresa un correo válido</span>
          </div>
        </div>

        <!-- Campo: Contraseña -->
        <div>
          <div class="flex justify-between items-center mb-2">
            <label class="block text-sm font-normal text-gray-700">
              Contraseña
            </label>
            <span
                class="text-sm text-[#46828a] hover:text-[#3a6d73] cursor-pointer"
                (click)="onForgot()">
              ¿Olvidaste la contraseña?
            </span>
          </div>

          <input
              type="password"
              formControlName="password"
              placeholder="Tu contraseña"
              class="w-full px-4 py-3 bg-white border border-[#46828a] rounded-md text-base text-gray-700 placeholder-gray-400
                   focus:outline-none focus:border-[#46828a] focus:ring-0 transition-colors duration-200"
              [class.border-red-500]="passwordControl.invalid && passwordControl.touched"
          />

          <div *ngIf="passwordControl.invalid && passwordControl.touched" class="mt-1.5 text-xs text-red-600">
            <span *ngIf="passwordControl.hasError('required')">La contraseña es requerida</span>
            <span *ngIf="passwordControl.hasError('minlength')">La contraseña debe tener al menos 6 caracteres</span>
          </div>
        </div>

        <!-- Botón principal -->
        <button
            type="submit"
            [disabled]="form.invalid || isLoading"
            class="w-full bg-[#46828a] hover:bg-[#3a6d73] text-white font-semibold py-3 rounded-md
                 transition-colors duration-200 focus:outline-none focus:ring-0 shadow-none
                 disabled:opacity-50 disabled:cursor-not-allowed">
          {{ isLoading ? 'Iniciando sesión...' : 'Iniciar sesión' }}
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
            class="w-full border border-[#46828a] bg-[#46828a] hover:bg-[#3a6d73] text-white font-semibold py-3 rounded-md
                 transition-colors duration-200 focus:outline-none focus:ring-0 shadow-none">
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
  isLoading = false;

  constructor(
      private fb: FormBuilder,
      private auth: AuthService,
      private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get emailControl() {
    return this.form.get('email');
  }

  get passwordControl() {
    return this.form.get('password');
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = undefined;

    this.auth.login(this.form.value).subscribe({
      next: (response) => {
        console.log('Login exitoso:', response);
        this.isLoading = false;
        this.router.navigate(['/home']);
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error en login:', error);

        if (error.status === 401) {
          this.errorMessage = 'Usuario o contraseña incorrectos';
        } else if (error.status === 0) {
          this.errorMessage = 'No se pudo conectar al servidor. Verifica tu conexión.';
        } else if (error.error?.message) {
          this.errorMessage = error.error.message;
        } else {
          this.errorMessage = 'Error al iniciar sesión. Por favor intenta nuevamente';
        }
      }
    });
  }

  onForgot() {
    alert('La recuperación de contraseña aún no está disponible.');
  }

  navigateToRegister() {
    this.router.navigate(['/auth/register']);
  }
}
