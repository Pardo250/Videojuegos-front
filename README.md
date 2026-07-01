# GameVault — Frontend

Colección personal de videojuegos con estética gamer (dark mode, neón púrpura/cian, glassmorphism). Frontend en Angular que consume el backend [`Videojuegos-back`](../Videojuegos-back) (Spring Boot + PostgreSQL + JWT + RAWG API).

## Stack

- **Angular 19** — standalone components, esbuild builder, signals
- **Tailwind CSS 3** — sistema de diseño gamer (paleta, sombras neón, animaciones)
- **GSAP** + **Angular Animations** — transiciones y contadores animados
- **Fuentes**: Orbitron (display) y Oxanium (sans), vía Google Fonts

## Requisitos previos

- Node.js 22.22+ / 24.15+ (o 26+)
- El backend [`Videojuegos-back`](../Videojuegos-back) corriendo en `http://localhost:8080` (incluye PostgreSQL vía `docker-compose.yml` y su propio README con instrucciones de arranque)

## Puesta en marcha

```bash
npm install
npm start        # equivalente a `ng serve` — sirve en http://localhost:4200
```

Con el backend levantado en paralelo, el login, registro y las llamadas al API funcionan de extremo a extremo. Sin el backend, la app sigue siendo navegable pero usa datos mock (`shared/data/mock-juegos.ts`) en las pantallas que aún no están conectadas al API real.

La URL del backend se configura en [`src/environments/environment.ts`](src/environments/environment.ts).

## Scripts

| Comando         | Descripción                                              |
|-----------------|-----------------------------------------------------------|
| `npm start`     | Levanta el servidor de desarrollo (`ng serve`)             |
| `npm run build` | Build de producción en `dist/`                             |
| `npm run watch` | Build en modo watch (configuración development)            |
| `npm test`      | Tests unitarios con Karma/Jasmine                           |

## Pantallas

| Ruta                | Protegida | Descripción                                   |
|----------------------|:---------:|------------------------------------------------|
| `/login`             | No        | Inicio de sesión (por usuario, no correo)      |
| `/register`          | No        | Registro de cuenta nueva                        |
| `/dashboard`         | Sí        | Estadísticas generales y juegos recientes       |
| `/buscar`            | Sí        | Búsqueda de juegos vía RAWG                     |
| `/coleccion`         | Sí        | Biblioteca personal filtrable y ordenable       |
| `/juego/:id`         | Sí        | Detalle de un juego, rating y reseña            |
| `/perfil/:usuario`   | No        | Perfil público compartible de la colección      |

Las rutas protegidas usan `authGuard` y redirigen a `/login` si no hay sesión activa.

## Estructura del proyecto

```
src/app/
├── core/                     # infraestructura transversal
│   ├── guards/                 # authGuard (protege rutas privadas)
│   ├── interceptors/           # authInterceptor (adjunta JWT a las peticiones)
│   ├── layout/navbar/          # navbar con estado de sesión
│   ├── models/                 # DTOs del API (auth)
│   └── services/                # AuthService
├── features/                 # una carpeta por pantalla
│   ├── auth/login/ | register/
│   ├── dashboard/
│   ├── buscar/
│   ├── coleccion/
│   ├── juego-detalle/
│   └── perfil/
└── shared/                   # reutilizable entre features
    ├── data/                   # datos mock (mientras se conectan más endpoints)
    ├── models/                  # modelos de dominio (JuegoColeccion, EstadoJuego)
    └── ui/                       # game-card, stat-card, background-grid
```

## Autenticación

- El login/registro consumen `POST /api/auth/login` y `POST /api/auth/registro` del backend.
- El JWT devuelto se guarda en `localStorage` y se adjunta automáticamente como `Authorization: Bearer <token>` en cada petición vía `authInterceptor`.
- El estado de sesión (`AuthService.isAuthenticated`, `AuthService.username`) es reactivo (signals) y se refleja en el navbar y en las rutas protegidas.

## Sistema de diseño

La paleta y utilidades gamer están centralizadas en [`tailwind.config.js`](tailwind.config.js) (colores `void`/`neon`, sombras `glow-*`, animaciones `pulse-glow`/`border-flow`) y en las clases reutilizables de [`src/styles.css`](src/styles.css) (`.game-card`, `.btn-neon`, `.btn-outline`, `.badge-*`, `.input-gamer`).

## Estado del proyecto

- ✅ UI completa de las 7 pantallas con estilo gamer y animaciones
- ✅ Autenticación real conectada al backend (registro, login, logout, rutas protegidas)
- ⏳ Pendiente: conectar `/buscar`, `/coleccion`, `/dashboard` y `/perfil/:usuario` a los endpoints reales del API (`/api/buscar`, `/api/coleccion`, `/api/estadisticas`, `/api/perfil/{username}`) — actualmente usan datos mock
