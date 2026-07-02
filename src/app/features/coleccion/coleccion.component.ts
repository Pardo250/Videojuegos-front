import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { GameCardComponent } from '../../shared/ui/game-card/game-card.component';
import { ColeccionService } from '../../core/services/coleccion.service';
import { mapJuegoColeccionResponse } from '../../shared/models/coleccion.mapper';
import { ESTADO_LABEL, EstadoJuego, JuegoColeccion } from '../../shared/models/juego-coleccion.model';

type Filtro = EstadoJuego | 'todos';
type Orden = 'reciente' | 'rating' | 'horas' | 'titulo';

@Component({
  selector: 'app-coleccion',
  imports: [GameCardComponent],
  templateUrl: './coleccion.component.html',
  styleUrl: './coleccion.component.css',
})
export class ColeccionComponent implements OnInit {
  private readonly coleccionService = inject(ColeccionService);

  private readonly coleccion = signal<JuegoColeccion[]>([]);

  protected readonly cargando = signal(true);
  protected readonly errorCarga = signal('');

  protected readonly estadoLabel = ESTADO_LABEL;
  protected readonly filtros: Filtro[] = ['todos', 'jugando', 'completado', 'pendiente', 'wishlist', 'abandonado'];
  protected readonly filtroActivo = signal<Filtro>('todos');
  protected readonly orden = signal<Orden>('reciente');

  protected readonly resultado = computed(() => {
    const filtro = this.filtroActivo();
    const filtrados =
      filtro === 'todos' ? [...this.coleccion()] : this.coleccion().filter((j) => j.estado === filtro);

    switch (this.orden()) {
      case 'rating':
        return filtrados.sort((a, b) => b.rating - a.rating);
      case 'horas':
        return filtrados.sort((a, b) => b.horasJugadas - a.horasJugadas);
      case 'titulo':
        return filtrados.sort((a, b) => a.titulo.localeCompare(b.titulo));
      default:
        return filtrados.sort(
          (a, b) => new Date(b.fechaLanzamiento).getTime() - new Date(a.fechaLanzamiento).getTime(),
        );
    }
  });

  ngOnInit(): void {
    this.coleccionService.listar().subscribe({
      next: (respuesta) => {
        this.coleccion.set(respuesta.map(mapJuegoColeccionResponse));
        this.cargando.set(false);
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error al cargar la colección (GET /api/coleccion):', err);
        this.errorCarga.set(
          `No se pudo cargar tu colección (${err.status || 'sin conexión'}): ${err.error?.mensaje ?? err.message}`,
        );
        this.cargando.set(false);
      },
    });
  }

  setFiltro(filtro: Filtro): void {
    this.filtroActivo.set(filtro);
  }

  setOrden(orden: Orden): void {
    this.orden.set(orden);
  }
}
