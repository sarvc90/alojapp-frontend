import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-organism-login-form',
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()" class="flex flex-col gap-4 w-full">

      <!-- Campo: Correo electrónico o teléfono -->
      <label class="block text-sm font-normal text-gray-700 mb-1">
        Correo electrónico o teléfono
      </label>
      <app-molecule-form-field
          placeholder="tu.email@example.com"
          [control]="usernameControl">
      </app-molecule-form-field>

      <!-- Campo: Contraseña -->
      <div>
        <div class="flex justify-between items-center mb-1">
          <label class="block text-sm font-normal text-gray-700">
            Contraseña
          </label>
          <a
              class="text-sm text-[#46828a] hover:text-[#3a6d73] cursor-pointer"
              (click)="forgotPassword.emit()">
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
          class="w-full border border-[#46828a] bg-[#46828a] hover:bg-[#3a6d73] text-white font-semibold py-3 rounded-md transition-colors duration-200 focus:outline-none focus:ring-0 shadow-none">
        Crear cuenta
      </button>
    </form>
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
export class LoginFormOrganismComponent {
  @Input() form!: FormGroup;
  @Output() submitForm = new EventEmitter<void>();
  @Output() forgotPassword = new EventEmitter<void>();

  get usernameControl(): FormControl {
    return this.form.get('username') as FormControl;
  }

  get passwordControl(): FormControl {
    return this.form.get('password') as FormControl;
  }

  onSubmit() {
    if (this.form.valid) this.submitForm.emit();
    else this.form.markAllAsTouched();
  }
}
