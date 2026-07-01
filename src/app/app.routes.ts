import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/register/register.component').then((m) => m.RegisterComponent),
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then((m) => m.DashboardComponent),
  },
  {
    path: 'buscar',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/buscar/buscar.component').then((m) => m.BuscarComponent),
  },
  {
    path: 'coleccion',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/coleccion/coleccion.component').then((m) => m.ColeccionComponent),
  },
  {
    path: 'juego/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/juego-detalle/juego-detalle.component').then(
        (m) => m.JuegoDetalleComponent,
      ),
  },
  {
    path: 'perfil/:usuario',
    loadComponent: () =>
      import('./features/perfil/perfil.component').then((m) => m.PerfilComponent),
  },
  { path: '**', redirectTo: 'dashboard' },
];
