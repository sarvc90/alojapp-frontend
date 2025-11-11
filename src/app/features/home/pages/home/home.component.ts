import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
    selector: 'app-home-page',
    template: `
    <div class="min-h-screen bg-white">
      <header class="bg-white border-b border-gray-200 px-6 py-4">
        <div class="max-w-7xl mx-auto flex items-center justify-between">
          <div class="flex items-center gap-3">
            <svg class="w-10 h-10 text-[#46828a]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>
            <span class="text-2xl font-bold italic">ALOJAPP</span>
          </div>
          <div class="flex-1 max-w-2xl mx-8">
            <input type="text" placeholder="Buscar alojamientos" class="w-full px-4 py-2 border rounded-lg"/>
          </div>
          <nav class="flex items-center gap-6">
            <button class="text-gray-700">Explorar</button>
            <button class="text-gray-700">Perfil</button>
            <button (click)="logout()" class="px-4 py-2 bg-[#46828a] text-white rounded-lg">Cerrar sesión</button>
          </nav>
        </div>
      </header>
      <main class="max-w-7xl mx-auto px-6 py-8">
        <h1 class="text-3xl font-bold mb-4" *ngIf="nombreUsuario">Bienvenido, {{ nombreUsuario }}! 👋</h1>
        <p class="text-gray-600 mb-8">Explora y encuentra tu alojamiento perfecto</p>
        
        <div class="bg-[#e8f4f5] rounded-2xl p-6 mb-10">
          <div class="grid grid-cols-4 gap-4">
            <input type="text" placeholder="Ciudad" class="px-4 py-3 border rounded-lg"/>
            <input type="date" placeholder="Check-in" class="px-4 py-3 border rounded-lg"/>
            <input type="date" placeholder="Check-out" class="px-4 py-3 border rounded-lg"/>
            <input type="number" placeholder="Huéspedes" class="px-4 py-3 border rounded-lg"/>
          </div>
          <button class="mt-4 px-8 py-3 bg-[#46828a] text-white rounded-lg font-semibold">Buscar</button>
        </div>

        <section class="mb-12">
          <h2 class="text-2xl font-bold mb-6">Destinos Populares</h2>
          <div class="grid grid-cols-4 gap-6">
            <div class="relative rounded-2xl overflow-hidden h-48 bg-gray-200">
              <div class="absolute inset-0 flex items-end p-4 bg-gradient-to-t from-black/60">
                <span class="text-white font-semibold">París, Francia</span>
              </div>
            </div>
            <div class="relative rounded-2xl overflow-hidden h-48 bg-gray-200">
              <div class="absolute inset-0 flex items-end p-4 bg-gradient-to-t from-black/60">
                <span class="text-white font-semibold">Kyoto, Japón</span>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-6">Alojamientos Populares</h2>
          <div class="grid grid-cols-4 gap-6">
            <div class="bg-white rounded-2xl shadow-md overflow-hidden">
              <div class="h-48 bg-gray-200"></div>
              <div class="p-4">
                <h3 class="font-bold text-lg mb-2">Villa lujosa frente al mar</h3>
                <p class="text-gray-600 text-sm mb-2">📍 Mauí, Hawaii</p>
                <p class="text-yellow-500 mb-2">⭐ 4.9</p>
                <p class="text-[#46828a] font-bold text-xl">$1200 <span class="text-sm text-gray-600">/ noche</span></p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  `
})
export class HomePageComponent implements OnInit {
    nombreUsuario: string | null = null;

    constructor(private auth: AuthService, private router: Router) {}

    ngOnInit() {
        this.nombreUsuario = this.auth.getNombre();
    }

    logout() {
        this.auth.logout();
        this.router.navigate(['/auth/login']);
    }
}