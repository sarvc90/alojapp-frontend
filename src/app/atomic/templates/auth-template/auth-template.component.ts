import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-auth-template',
  template: `
    <div class="min-h-screen flex items-center justify-center p-6 bg-white">
      <div class="w-full max-w-lg">
        <div class="text-center mb-12">
          <div class="flex items-center justify-center gap-3 mb-8">
            <svg class="w-14 h-14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>
            <span class="text-4xl font-bold italic">ALOJAPP</span>
          </div>

          <h1 class="text-3xl font-semibold text-teal-700 mb-3">
            {{title}}
          </h1>
          <p class="text-gray-600 text-base">{{subtitle}}</p>
        </div>

        <ng-content></ng-content>
      </div>
    </div>
  `
})
export class AuthTemplateComponent {
  @Input() title = 'Bienvenido';
  @Input() subtitle = '';
  @Input() logo?: string;
}