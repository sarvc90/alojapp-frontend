import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { ButtonAtomComponent } from './atoms/button/button.component';
import { InputAtomComponent } from './atoms/input/input.component';
import { FormFieldMoleculeComponent } from './molecules/form-field/form-field.component';
import { LoginFormOrganismComponent } from './organisms/login-form/login-form.component';
import { AuthTemplateComponent } from './templates/auth-template/auth-template.component';

@NgModule({
  declarations: [
    ButtonAtomComponent,
    InputAtomComponent,
    FormFieldMoleculeComponent,
    LoginFormOrganismComponent,
    AuthTemplateComponent
  ],
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatInputModule, MatFormFieldModule],
  exports: [
    ButtonAtomComponent,
    InputAtomComponent,
    FormFieldMoleculeComponent,
    LoginFormOrganismComponent,
    AuthTemplateComponent
  ]
})
export class AtomicModule {}
