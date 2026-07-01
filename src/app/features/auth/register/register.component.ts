import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ApiError } from '../../../core/models/auth.model';

@Component({
  selector: 'app-register',
  imports: [RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly username = signal('');
  protected readonly email = signal('');
  protected readonly password = signal('');
  protected readonly loading = signal(false);
  protected readonly errorMessage = signal('');

  onSubmit(): void {
    if (this.username().length < 3) {
      this.errorMessage.set('El usuario debe tener al menos 3 caracteres.');
      return;
    }
    if (this.password().length < 8) {
      this.errorMessage.set('La contraseña debe tener al menos 8 caracteres.');
      return;
    }

    this.errorMessage.set('');
    this.loading.set(true);

    this.auth
      .register({ username: this.username(), email: this.email(), password: this.password() })
      .subscribe({
        next: () => {
          this.loading.set(false);
          this.router.navigateByUrl('/dashboard');
        },
        error: (err: { error?: ApiError }) => {
          this.loading.set(false);
          this.errorMessage.set(
            err.error?.mensaje ?? 'No se pudo crear la cuenta. Intenta de nuevo.',
          );
        },
      });
  }
}
