import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-organism-login-form',
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()" class="flex flex-col gap-4 w-full">
      <app-molecule-form-field label="Correo electrónico" placeholder="tu.email@example.com" [control]="form.controls['username']"></app-molecule-form-field>
      <app-molecule-form-field label="Contraseña" placeholder="Tu contraseña" type="password" [control]="form.controls['password']"></app-molecule-form-field>
      <app-atom-button label="Iniciar sesión" type="submit"></app-atom-button>
      <a class="text-sm text-center mt-2 cursor-pointer" (click)="forgotPassword.emit()">Olvidaste la contraseña?</a>
    </form>
  `
})
export class LoginFormOrganismComponent {
  @Input() form!: FormGroup;
  @Output() submitForm = new EventEmitter<void>();
  @Output() forgotPassword = new EventEmitter<void>();

  onSubmit() {
    if (this.form.valid) this.submitForm.emit();
    else this.form.markAllAsTouched();
  }
}
