export type EstadoJuegoApi = 'JUGANDO' | 'COMPLETADO' | 'ABANDONADO' | 'PENDIENTE' | 'WISHLIST';

export interface JuegoResumenResponse {
  rawgId: number;
  nombre: string;
  imagenUrl: string;
  fechaLanzamiento: string;
  metacritic: number;
  plataformas: string[];
  generos: string[];
}

export interface JuegoColeccionResponse {
  id: number;
  juego: JuegoResumenResponse;
  estado: EstadoJuegoApi;
  horasJugadas: number;
  ratingPersonal: number;
  resena: string;
  fechaAgregado: string;
  fechaCompletado: string | null;
}

export interface AgregarColeccionRequest {
  rawgId: number;
  estado: EstadoJuegoApi;
  horasJugadas?: number;
  ratingPersonal?: number;
  resena?: string;
}

export interface ActualizarColeccionRequest {
  estado: EstadoJuegoApi;
  horasJugadas?: number;
  ratingPersonal?: number;
  resena?: string;
  fechaCompletado?: string;
}

export interface ResenaResponse {
  username: string;
  nombreVisible: string | null;
  ratingPersonal: number | null;
  resena: string | null;
  fechaCreacion: string;
}

export interface CrearResenaRequest {
  resena: string;
  ratingPersonal?: number;
}
