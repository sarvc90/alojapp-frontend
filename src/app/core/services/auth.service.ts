import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

interface AuthResponse {
  token: string;
  roles?: string[];
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

  logout() { localStorage.clear(); }
  getToken() { return localStorage.getItem('token'); }
  isLoggedIn() { return !!this.getToken(); }
  getRoles(): string[] { return JSON.parse(localStorage.getItem('roles') || '[]'); }
}
