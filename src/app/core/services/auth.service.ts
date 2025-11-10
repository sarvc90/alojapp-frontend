import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

interface AuthResponse {
  token: string;
  roles?: string[];
}

interface RegistroHuespedDto {
  nombre: string;
  email: string;
  password: string;
  telefono: string;
  fechaNacimiento: string;
}

interface RegistroAnfitrionDto {
  nombre: string;
  email: string;
  password: string;
  telefono: string;
  fechaNacimiento: string;
  descripcionPersonal?: string;
  fotoPerfilUrl?: string;
  documentosLegalesUrl?: string;
}

interface UsuarioResponse {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
  fechaNacimiento: string;
  fechaRegistro: string;
  fechaUltimaConexion: string | null;
  estado: string;
  fotoPerfilUrl: string | null;
  esAnfitrion: boolean | null;
  esAdmin: boolean | null;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private base = environment.apiBaseUrl + '/auth';

  constructor(private http: HttpClient) {}

  login(data: { username: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.base}/login`, data).pipe(
        tap(res => {
          if (res?.token) localStorage.setItem('token', res.token);
          if (res?.roles) localStorage.setItem('roles', JSON.stringify(res.roles));
        })
    );
  }

  registroHuesped(data: RegistroHuespedDto): Observable<UsuarioResponse> {
    return this.http.post<UsuarioResponse>(`${this.base}/registro-huesped`, data);
  }

  registroAnfitrion(data: RegistroAnfitrionDto): Observable<UsuarioResponse> {
    return this.http.post<UsuarioResponse>(`${this.base}/registro-anfitrion`, data);
  }

  logout() { localStorage.clear(); }
  getToken() { return localStorage.getItem('token'); }
  isLoggedIn() { return !!this.getToken(); }
  getRoles(): string[] { return JSON.parse(localStorage.getItem('roles') || '[]'); }
}