import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
    selector: 'app-home-page',
    template: `
        <div class="min-h-screen bg-white">
            <!-- Barra lateral flotante -->
            <div class="fixed right-0 bottom-44 z-50 group">
                <!-- Barra colapsada -->
                <div class="absolute right-0 top-0 bg-[#9dbebb] rounded-l-2xl shadow-lg transition-all duration-300 group-hover:w-40 w-14 py-4">
                    <!-- Home -->
                    <div class="flex items-center gap-3 px-3 py-2 hover:bg-white/20 transition-colors cursor-pointer">
                        <div class="w-8 h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0 order-2">
                            <svg class="w-5 h-5 text-[#468189]" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                            </svg>
                        </div>
                        <span class="text-white font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap order-1">Home</span>
                    </div>

                    <!-- Búsqueda -->
                    <div class="flex items-center gap-3 px-3 py-2 hover:bg-white/20 transition-colors cursor-pointer">
                        <div class="w-8 h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0 order-2">
                            <svg class="w-5 h-5 text-[#468189]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                            </svg>
                        </div>
                        <span class="text-white font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap order-1">Búsqueda</span>
                    </div>

                    <!-- Perfil -->
                    <div class="flex items-center gap-3 px-3 py-2 hover:bg-white/20 transition-colors cursor-pointer">
                        <div class="w-8 h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0 order-2">
                            <svg class="w-5 h-5 text-[#468189]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                            </svg>
                        </div>
                        <span class="text-white font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap order-1">Perfil</span>
                    </div>
                </div>
            </div>

            <header class="bg-[#9dbebb] px-6 py-4 shadow-sm">
                <div class="max-w-7xl mx-auto flex items-center justify-between">
                    <div class="flex items-center gap-3">
                        <svg class="w-10 h-10 text-black" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                        </svg>
                        <span class="text-2xl font-bold italic text-black">ALOJAPP</span>
                    </div>
                    <div class="flex-1 max-w-2xl mx-8 relative">
                        <svg class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                        </svg>
                        <input
                                type="text"
                                placeholder="Buscar alojamientos"
                                class="w-full pl-10 pr-4 py-2 border-2 border-[#46828a] rounded-lg focus:outline-none focus:border-[#46828a] focus:ring-0 text-gray-400 placeholder-gray-400"
                        />
                    </div>
                    <button
                            (click)="logout()"
                            class="px-6 py-2 bg-white text-[#46828a] font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-200"
                    >
                        Cerrar sesión
                    </button>
                </div>
            </header>

            <!-- Barra de navegación secundaria -->
            <nav class="bg-white px-6 py-4">
                <div class="max-w-7xl mx-auto flex items-center justify-around">
                    <button class="text-black font-medium hover:text-[#46828a] transition-colors bg-transparent border-0">Explorar</button>
                    <button class="text-black font-medium hover:text-[#46828a] transition-colors bg-transparent border-0">Ser anfitrión</button>
                    <button class="text-black font-medium hover:text-[#46828a] transition-colors bg-transparent border-0">Perfil</button>
                    <button class="text-black font-medium hover:text-[#46828a] transition-colors bg-transparent border-0">Login</button>
                </div>
            </nav>

            <main class="max-w-7xl mx-auto px-6 py-8">
                <h1 class="text-3xl font-bold mb-4" *ngIf="nombreUsuario">Bienvenido, {{ nombreUsuario }}! 👋</h1>
                <p class="text-gray-600 mb-8">Explora y encuentra tu alojamiento perfecto</p>

                <div class="bg-[#77aca2] rounded-2xl p-6 mb-10">
                    <div class="grid grid-cols-4 gap-4">
                        <input
                                type="text"
                                placeholder="Ciudad"
                                class="px-4 py-3 border-2 border-[#468189] rounded-lg focus:outline-none focus:border-[#468189] focus:ring-0"
                        />
                        <input
                                type="text"
                                placeholder="Check in"
                                onfocus="(this.type='date')"
                                onblur="if(!this.value)this.type='text'"
                                class="px-4 py-3 border-2 border-[#468189] rounded-lg focus:outline-none focus:border-[#468189] focus:ring-0"
                        />
                        <input
                                type="text"
                                placeholder="Check out"
                                onfocus="(this.type='date')"
                                onblur="if(!this.value)this.type='text'"
                                class="px-4 py-3 border-2 border-[#468189] rounded-lg focus:outline-none focus:border-[#468189] focus:ring-0"
                        />
                        <div class="relative">
                            <svg class="w-5 h-5 text-gray-600 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                            </svg>
                            <input
                                    type="number"
                                    placeholder="Huéspedes"
                                    class="w-full pl-10 pr-4 py-3 border-2 border-[#468189] rounded-lg focus:outline-none focus:border-[#468189] focus:ring-0"
                            />
                        </div>
                    </div>
                    <div class="flex justify-center mt-4">
                        <button class="px-8 py-3 bg-[#468189] text-white rounded-lg font-semibold hover:bg-[#3a6d73] transition-colors">
                            Buscar
                        </button>
                    </div>
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

            <!-- Footer -->
            <footer class="bg-[#9dbebb] mt-16 py-8 px-6">
                <div class="max-w-7xl mx-auto">
                    <div class="mb-8">
                        <h3 class="text-black font-bold text-lg mb-4">Links</h3>
                        <ul class="space-y-2">
                            <li><a href="#" class="text-gray-700 hover:text-[#468189]">Acerca de nosotros</a></li>
                            <li><a href="#" class="text-gray-700 hover:text-[#468189]">Contáctanos</a></li>
                            <li><a href="#" class="text-gray-700 hover:text-[#468189]">Política de privacidad</a></li>
                            <li><a href="#" class="text-gray-700 hover:text-[#468189]">Términos de servicio</a></li>
                        </ul>
                    </div>

                    <div class="mb-8">
                        <h3 class="text-black font-bold text-lg mb-4">Síguenos</h3>
                        <div class="flex gap-4">
                            <a href="#" class="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                                <svg class="w-6 h-6 text-[#468189]" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                </svg>
                            </a>
                            <a href="#" class="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                                <svg class="w-6 h-6 text-[#468189]" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                </svg>
                            </a>
                            <a href="#" class="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                                <svg class="w-6 h-6 text-[#468189]" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                                </svg>
                            </a>
                            <a href="#" class="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                                <svg class="w-6 h-6 text-[#468189]" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
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