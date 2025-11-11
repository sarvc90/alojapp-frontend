import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

interface AuthResponse {
  token: string;
  tokenType: string;
  usuarioId: number;
  nombre: string;
  email: string;
  rol: string;
  expiresIn: number;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private base = environment.apiBaseUrl + '/auth';

  constructor(private http: HttpClient) {}

  // 🔹 Login
  login(data: { email: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.base}/login`, data).pipe(
        tap(res => {
          if (res?.token) {
            localStorage.setItem('token', res.token);
            localStorage.setItem('usuarioId', res.usuarioId.toString());
            localStorage.setItem('nombre', res.nombre);
            localStorage.setItem('email', res.email);
            localStorage.setItem('rol', res.rol);
          }
        })
    );
  }

  // 🔹 Registro de huésped
  registroHuesped(data: any): Observable<any> {
    return this.http.post(`${this.base}/registro-huesped`, data);
  }

  // 🔹 Registro de anfitrión
  registroAnfitrion(data: any): Observable<any> {
    return this.http.post(`${this.base}/registro-anfitrion`, data);
  }

  // 🔹 Utilidades
  logout() { localStorage.clear(); }
  getToken() { return localStorage.getItem('token'); }
  isLoggedIn() { return !!this.getToken(); }
  getRoles(): string[] { return JSON.parse(localStorage.getItem('roles') || '[]'); }

  getUsuarioId(): number | null {
    const id = localStorage.getItem('usuarioId');
    return id ? parseInt(id) : null;
  }

  getNombre(): string | null { return localStorage.getItem('nombre'); }
  getEmail(): string | null { return localStorage.getItem('email'); }
  getRol(): string | null { return localStorage.getItem('rol'); }
}
