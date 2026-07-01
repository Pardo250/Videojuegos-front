import { Injectable, computed, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthResponse, LoginRequest, RegisterRequest } from '../models/auth.model';

const TOKEN_KEY = 'gv_token';
const USERNAME_KEY = 'gv_username';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly baseUrl = `${environment.apiUrl}/auth`;

  private readonly _token = signal<string | null>(localStorage.getItem(TOKEN_KEY));
  private readonly _username = signal<string | null>(localStorage.getItem(USERNAME_KEY));

  readonly token = this._token.asReadonly();
  readonly username = this._username.asReadonly();
  readonly isAuthenticated = computed(() => this._token() !== null);

  constructor(private readonly http: HttpClient) {}

  login(credenciales: LoginRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.baseUrl}/login`, credenciales)
      .pipe(tap((res) => this.guardarSesion(res)));
  }

  register(datos: RegisterRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.baseUrl}/registro`, datos)
      .pipe(tap((res) => this.guardarSesion(res)));
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USERNAME_KEY);
    this._token.set(null);
    this._username.set(null);
  }

  private guardarSesion(res: AuthResponse): void {
    localStorage.setItem(TOKEN_KEY, res.token);
    localStorage.setItem(USERNAME_KEY, res.username);
    this._token.set(res.token);
    this._username.set(res.username);
  }
}
