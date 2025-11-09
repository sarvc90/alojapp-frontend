import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-molecule-form-field',
  template: `
    <label class="block text-sm font-medium mb-1">{{label}}</label>
    <app-atom-input [label]="label" [placeholder]="placeholder" [type]="type" [control]="control"></app-atom-input>
  `
})
export class FormFieldMoleculeComponent {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() type = 'text';
  @Input() control!: FormControl;
}
