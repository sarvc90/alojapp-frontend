import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'app-organism-register-form',
    template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()" class="flex flex-col gap-4 w-full">

      <!-- Selector de tipo de usuario -->
      <div class="mb-4">
        <label class="block text-sm font-normal text-gray-700 mb-3">
          Tipo de cuenta
        </label>
        <div class="grid grid-cols-2 gap-3">
          <button
            type="button"
            [class.bg-[#46828a]]="tipoUsuarioControl.value === 'HUESPED'"
            [class.text-white]="tipoUsuarioControl.value === 'HUESPED'"
            [class.border-[#46828a]]="tipoUsuarioControl.value === 'HUESPED'"
            [class.bg-white]="tipoUsuarioControl.value !== 'HUESPED'"
            [class.text-gray-700]="tipoUsuarioControl.value !== 'HUESPED'"
            class="border-2 py-3 px-4 rounded-md font-semibold transition-all duration-200"
            (click)="tipoUsuarioControl.setValue('HUESPED')">
            🏠 Huésped
          </button>
          <button
            type="button"
            [class.bg-[#46828a]]="tipoUsuarioControl.value === 'ANFITRION'"
            [class.text-white]="tipoUsuarioControl.value === 'ANFITRION'"
            [class.border-[#46828a]]="tipoUsuarioControl.value === 'ANFITRION'"
            [class.bg-white]="tipoUsuarioControl.value !== 'ANFITRION'"
            [class.text-gray-700]="tipoUsuarioControl.value !== 'ANFITRION'"
            class="border-2 py-3 px-4 rounded-md font-semibold transition-all duration-200"
            (click)="tipoUsuarioControl.setValue('ANFITRION')">
            🔑 Anfitrión
          </button>
        </div>
      </div>

      <!-- Nombre completo -->
      <div>
        <label class="block text-sm font-normal text-gray-700 mb-2">
          Nombre completo
        </label>
        <app-molecule-form-field
          placeholder="Ej: Juan Pérez"
          [control]="nombreControl">
        </app-molecule-form-field>
      </div>

      <!-- Correo electrónico -->
      <div>
        <label class="block text-sm font-normal text-gray-700 mb-2">
          Correo electrónico
        </label>
        <app-molecule-form-field
          placeholder="tu.email@example.com"
          type="email"
          [control]="emailControl">
        </app-molecule-form-field>
      </div>

      <!-- Teléfono -->
      <div>
        <label class="block text-sm font-normal text-gray-700 mb-2">
          Teléfono
        </label>
        <app-molecule-form-field
          placeholder="+573001234567"
          type="tel"
          [control]="telefonoControl">
        </app-molecule-form-field>
      </div>

      <!-- Fecha de nacimiento -->
      <div>
        <label class="block text-sm font-normal text-gray-700 mb-2">
          Fecha de nacimiento
        </label>
        <input
          type="date"
          [formControl]="fechaNacimientoControl"
          class="w-full px-4 py-3 bg-white border border-[#46828a] rounded-md text-base text-gray-700
                 focus:outline-none focus:border-[#46828a] focus:ring-0 transition-colors duration-200"
          [class.border-red-500]="fechaNacimientoControl?.invalid && fechaNacimientoControl?.touched"
        />
        <div *ngIf="fechaNacimientoControl?.invalid && fechaNacimientoControl?.touched" 
             class="mt-1.5 text-xs text-red-600">
          <span *ngIf="fechaNacimientoControl?.hasError('required')">La fecha de nacimiento es requerida</span>
        </div>
      </div>

      <!-- Contraseña -->
      <div>
        <label class="block text-sm font-normal text-gray-700 mb-2">
          Contraseña
        </label>
        <app-molecule-form-field
          placeholder="Mínimo 6 caracteres"
          type="password"
          [control]="passwordControl">
        </app-molecule-form-field>
      </div>

      <!-- Confirmar contraseña -->
      <div>
        <label class="block text-sm font-normal text-gray-700 mb-2">
          Confirmar contraseña
        </label>
        <input
          type="password"
          [formControl]="confirmPasswordControl"
          placeholder="Repite tu contraseña"
          class="w-full px-4 py-3 bg-white border border-[#46828a] rounded-md text-base text-gray-700
                 focus:outline-none focus:border-[#46828a] focus:ring-0 transition-colors duration-200"
          [class.border-red-500]="confirmPasswordControl?.invalid && confirmPasswordControl?.touched"
        />
        <div *ngIf="confirmPasswordControl?.invalid && confirmPasswordControl?.touched" 
             class="mt-1.5 text-xs text-red-600">
          <span *ngIf="confirmPasswordControl?.hasError('required')">Debes confirmar tu contraseña</span>
          <span *ngIf="confirmPasswordControl?.hasError('passwordMismatch')">Las contraseñas no coinciden</span>
        </div>
      </div>

      <!-- Campos adicionales para Anfitrión -->
      <div *ngIf="tipoUsuarioControl.value === 'ANFITRION'" class="border-t pt-4 mt-2">
        <h3 class="text-lg font-semibold text-[#46828a] mb-4">Información adicional de anfitrión</h3>

        <!-- Descripción personal -->
        <div class="mb-4">
          <label class="block text-sm font-normal text-gray-700 mb-2">
            Descripción personal
          </label>
          <textarea
            [formControl]="descripcionPersonalControl"
            placeholder="Cuéntanos sobre ti y tu experiencia como anfitrión..."
            rows="3"
            class="w-full px-4 py-3 bg-white border border-[#46828a] rounded-md text-base text-gray-700
                   focus:outline-none focus:border-[#46828a] focus:ring-0 transition-colors duration-200"
            [class.border-red-500]="descripcionPersonalControl?.invalid && descripcionPersonalControl?.touched">
          </textarea>
        </div>

        <!-- URL foto perfil -->
        <div class="mb-4">
          <label class="block text-sm font-normal text-gray-700 mb-2">
            URL de foto de perfil (opcional)
          </label>
          <app-molecule-form-field
            placeholder="https://ejemplo.com/foto.jpg"
            [control]="fotoPerfilUrlControl">
          </app-molecule-form-field>
        </div>

        <!-- URL documentos legales -->
        <div class="mb-4">
          <label class="block text-sm font-normal text-gray-700 mb-2">
            URL de documentos legales (opcional)
          </label>
          <app-molecule-form-field
            placeholder="https://ejemplo.com/documentos.pdf"
            [control]="documentosLegalesUrlControl">
          </app-molecule-form-field>
        </div>
      </div>

      <!-- Botón de registro -->
      <button
        type="submit"
        [disabled]="form.invalid"
        class="w-full bg-[#46828a] hover:bg-[#3a6d73] text-white font-semibold py-3 rounded-md 
               transition-colors duration-200 focus:outline-none focus:ring-0 shadow-none
               disabled:opacity-50 disabled:cursor-not-allowed">
        Crear cuenta
      </button>

      <!-- Separador -->
      <div class="flex items-center my-2">
        <hr class="flex-grow border-gray-300" />
        <span class="mx-2 text-gray-500">o</span>
        <hr class="flex-grow border-gray-300" />
      </div>

      <!-- Botón de login -->
      <button
        type="button"
        (click)="goToLogin.emit()"
        class="w-full border border-[#46828a] bg-white hover:bg-gray-50 text-[#46828a] 
               font-semibold py-3 rounded-md transition-colors duration-200 
               focus:outline-none focus:ring-0 shadow-none">
        ¿Ya tienes cuenta? Inicia sesión
      </button>
    </form>
  `,
    styles: [`
    :host ::ng-deep input:focus,
    :host ::ng-deep button:focus,
    :host ::ng-deep textarea:focus {
      outline: none !important;
      box-shadow: none !important;
    }
    :host ::ng-deep button {
      box-shadow: none !important;
    }
  `]
})
export class RegisterFormOrganismComponent {
    @Input() form!: FormGroup;
    @Output() submitForm = new EventEmitter<void>();
    @Output() goToLogin = new EventEmitter<void>();

    get tipoUsuarioControl(): FormControl {
        return this.form.get('tipoUsuario') as FormControl;
    }

    get nombreControl(): FormControl {
        return this.form.get('nombre') as FormControl;
    }

    get emailControl(): FormControl {
        return this.form.get('email') as FormControl;
    }

    get telefonoControl(): FormControl {
        return this.form.get('telefono') as FormControl;
    }

    get fechaNacimientoControl(): FormControl {
        return this.form.get('fechaNacimiento') as FormControl;
    }

    get passwordControl(): FormControl {
        return this.form.get('password') as FormControl;
    }

    get confirmPasswordControl(): FormControl {
        return this.form.get('confirmPassword') as FormControl;
    }

    get descripcionPersonalControl(): FormControl {
        return this.form.get('descripcionPersonal') as FormControl;
    }

    get fotoPerfilUrlControl(): FormControl {
        return this.form.get('fotoPerfilUrl') as FormControl;
    }

    get documentosLegalesUrlControl(): FormControl {
        return this.form.get('documentosLegalesUrl') as FormControl;
    }

    onSubmit() {
        if (this.form.valid) {
            this.submitForm.emit();
        } else {
            this.form.markAllAsTouched();
        }
    }
}