import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

interface NavLink {
  label: string;
  path: string;
  icon: string;
}

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly menuOpen = signal(false);
  protected readonly isAuthenticated = this.auth.isAuthenticated;
  protected readonly username = this.auth.username;

  protected readonly links: NavLink[] = [
    { label: 'Dashboard', path: '/dashboard', icon: 'M3 13h4v8H3v-8Zm7-9h4v17h-4V4Zm7 5h4v12h-4V9Z' },
    {
      label: 'Buscar',
      path: '/buscar',
      icon: 'M11 4a7 7 0 1 1 0 14 7 7 0 0 1 0-14Zm9 16-4.35-4.35',
    },
    {
      label: 'Colección',
      path: '/coleccion',
      icon: 'M4 5h16v3H4V5Zm0 6h16v3H4v-3Zm0 6h16v3H4v-3Z',
    },
  ];

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  logout(): void {
    this.auth.logout();
    this.menuOpen.set(false);
    this.router.navigateByUrl('/login');
  }
}
