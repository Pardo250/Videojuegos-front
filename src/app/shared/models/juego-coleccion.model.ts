export type EstadoJuego = 'jugando' | 'completado' | 'abandonado' | 'pendiente' | 'wishlist';

export interface JuegoColeccion {
  id: string;
  rawgId?: number;
  titulo: string;
  portada: string;
  genero: string;
  plataformas: string[];
  estado: EstadoJuego;
  horasJugadas: number;
  rating: number;
  fechaLanzamiento: string;
  resena?: string;
  fechaAgregado?: string;
}

export const ESTADO_LABEL: Record<EstadoJuego, string> = {
  jugando: 'Jugando',
  completado: 'Completado',
  abandonado: 'Abandonado',
  pendiente: 'Pendiente',
  wishlist: 'Wishlist',
};
