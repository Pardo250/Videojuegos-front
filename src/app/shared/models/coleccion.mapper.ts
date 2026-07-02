import { EstadoJuegoApi, JuegoColeccionResponse } from '../../core/models/coleccion.model';
import { EstadoJuego, JuegoColeccion } from './juego-coleccion.model';

const ESTADO_API_A_UI: Record<EstadoJuegoApi, EstadoJuego> = {
  JUGANDO: 'jugando',
  COMPLETADO: 'completado',
  ABANDONADO: 'abandonado',
  PENDIENTE: 'pendiente',
  WISHLIST: 'wishlist',
};

const ESTADO_UI_A_API: Record<EstadoJuego, EstadoJuegoApi> = {
  jugando: 'JUGANDO',
  completado: 'COMPLETADO',
  abandonado: 'ABANDONADO',
  pendiente: 'PENDIENTE',
  wishlist: 'WISHLIST',
};

export function mapEstadoApiAUi(estado: EstadoJuegoApi): EstadoJuego {
  return ESTADO_API_A_UI[estado];
}

export function mapEstadoUiAApi(estado: EstadoJuego): EstadoJuegoApi {
  return ESTADO_UI_A_API[estado];
}

export function mapJuegoColeccionResponse(res: JuegoColeccionResponse): JuegoColeccion {
  return {
    id: String(res.id),
    rawgId: res.juego.rawgId,
    titulo: res.juego.nombre,
    portada: res.juego.imagenUrl,
    genero: res.juego.generos.slice(0, 2).join(' / ') || 'Sin género',
    plataformas: res.juego.plataformas,
    estado: mapEstadoApiAUi(res.estado),
    horasJugadas: res.horasJugadas,
    rating: res.ratingPersonal,
    fechaLanzamiento: res.juego.fechaLanzamiento,
    resena: res.resena,
    fechaAgregado: res.fechaAgregado,
  };
}
