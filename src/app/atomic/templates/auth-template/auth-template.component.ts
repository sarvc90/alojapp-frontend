import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-auth-template',
  template: `
    <div class="min-h-screen flex items-center justify-center p-6">
      <div class="bg-white p-8 rounded-2xl shadow-md w-full max-w-md text-center">
        <img *ngIf="logo" [src]="logo" alt="logo" class="mx-auto mb-4 w-20 h-20"/>
        <h1 class="text-2xl font-semibold mb-2">{{title}}</h1>
        <p class="text-gray-600 mb-6">{{subtitle}}</p>
        <ng-content></ng-content>
        <div class="mt-4">
          <button class="w-full border rounded-md p-2" (click)="onCreate()">Crear cuenta</button>
        </div>
      </div>
    </div>
  `
})
export class AuthTemplateComponent {
  @Input() title = 'Bienvenido';
  @Input() subtitle = '';
  @Input() logo?: string;
  onCreate() { /* TODO: navigate to register */ }
}
