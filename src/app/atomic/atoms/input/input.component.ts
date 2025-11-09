import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-atom-input',
  template: `
    <mat-form-field appearance="outline" class="w-full">
      <mat-label>{{label}}</mat-label>
      <input matInput [type]="type" [formControl]="control" [placeholder]="placeholder" />
      <mat-error *ngIf="control?.invalid && control?.touched">Campo inválido</mat-error>
    </mat-form-field>
  `
})
export class InputAtomComponent {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() type = 'text';
  @Input() control!: FormControl;
}
