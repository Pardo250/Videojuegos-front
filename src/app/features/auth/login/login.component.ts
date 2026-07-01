import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ApiError } from '../../../core/models/auth.model';

@Component({
  selector: 'app-login',
  imports: [RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly username = signal('');
  protected readonly password = signal('');
  protected readonly loading = signal(false);
  protected readonly errorMessage = signal('');

  onSubmit(): void {
    if (!this.username() || !this.password()) {
      this.errorMessage.set('Completa usuario y contraseña.');
      return;
    }

    this.errorMessage.set('');
    this.loading.set(true);

    this.auth.login({ username: this.username(), password: this.password() }).subscribe({
      next: () => {
        this.loading.set(false);
        this.router.navigateByUrl('/dashboard');
      },
      error: (err: { error?: ApiError }) => {
        this.loading.set(false);
        this.errorMessage.set(err.error?.mensaje ?? 'No se pudo iniciar sesión. Intenta de nuevo.');
      },
    });
  }
}
