import { Component, computed, signal } from '@angular/core';
import { GameCardComponent } from '../../shared/ui/game-card/game-card.component';
import { MOCK_COLECCION } from '../../shared/data/mock-juegos';
import { ESTADO_LABEL, EstadoJuego } from '../../shared/models/juego-coleccion.model';

type Filtro = EstadoJuego | 'todos';
type Orden = 'reciente' | 'rating' | 'horas' | 'titulo';

@Component({
  selector: 'app-coleccion',
  imports: [GameCardComponent],
  templateUrl: './coleccion.component.html',
  styleUrl: './coleccion.component.css',
})
export class ColeccionComponent {
  private readonly coleccion = MOCK_COLECCION;

  protected readonly estadoLabel = ESTADO_LABEL;
  protected readonly filtros: Filtro[] = ['todos', 'jugando', 'completado', 'pendiente', 'wishlist', 'abandonado'];
  protected readonly filtroActivo = signal<Filtro>('todos');
  protected readonly orden = signal<Orden>('reciente');

  protected readonly resultado = computed(() => {
    const filtro = this.filtroActivo();
    const filtrados =
      filtro === 'todos' ? [...this.coleccion] : this.coleccion.filter((j) => j.estado === filtro);

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

  setFiltro(filtro: Filtro): void {
    this.filtroActivo.set(filtro);
  }

  setOrden(orden: Orden): void {
    this.orden.set(orden);
  }
}
