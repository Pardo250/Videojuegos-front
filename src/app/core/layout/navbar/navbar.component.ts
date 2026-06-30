import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

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
  protected readonly menuOpen = signal(false);

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
}
