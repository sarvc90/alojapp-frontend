import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-atom-input',
  template: `
    <div class="w-full mb-4">
      <div class="flex justify-between items-center mb-2">
        <label class="block text-sm font-normal text-gray-700">
          {{ label }}
        </label>

        <a *ngIf="showForgot"
           class="text-sm text-[#46828a] hover:text-[#3a6d73] cursor-pointer"
           (click)="onForgot()">
          {{ forgotText }}
        </a>
      </div>

      <input
          [type]="type"
          [formControl]="control"
          [placeholder]="placeholder"
          class="w-full px-4 py-3 bg-white border border-[#46828a] rounded-md text-base text-gray-700 placeholder-gray-400
               focus:outline-none focus:border-[#46828a] focus:ring-0 transition-colors duration-200"
          [class.border-red-500]="control?.invalid && control?.touched"
      />

      <div *ngIf="control?.invalid && control?.touched" class="mt-1.5 text-xs text-red-600">
        <span *ngIf="control?.hasError('required')">Este campo es requerido</span>
        <span *ngIf="control?.hasError('email')">Ingresa un correo válido</span>
        <span *ngIf="control?.hasError('minlength')">La contraseña debe tener al menos 6 caracteres</span>
      </div>
    </div>
  `,
  styles: [`
    input::placeholder {
      color: #9ca3af; /* gris claro tipo ejemplo */
    }
  `]
})
export class InputAtomComponent {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() type = 'text';
  @Input() control!: FormControl;
  @Input() showForgot = false;
  @Input() forgotText = 'Olvidaste la contraseña?';
  @Input() onForgotClick?: () => void;

  onForgot() {
    if (this.onForgotClick) {
      this.onForgotClick();
    }
  }
}
