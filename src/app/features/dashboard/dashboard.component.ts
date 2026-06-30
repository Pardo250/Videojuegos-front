import { Component, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StatCardComponent } from '../../shared/ui/stat-card/stat-card.component';
import { GameCardComponent } from '../../shared/ui/game-card/game-card.component';
import { MOCK_COLECCION } from '../../shared/data/mock-juegos';

@Component({
  selector: 'app-dashboard',
  imports: [StatCardComponent, GameCardComponent, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  protected readonly coleccion = MOCK_COLECCION;

  protected readonly totalJuegos = computed(() => this.coleccion.length);
  protected readonly completados = computed(
    () => this.coleccion.filter((j) => j.estado === 'completado').length,
  );
  protected readonly jugando = computed(
    () => this.coleccion.filter((j) => j.estado === 'jugando').length,
  );
  protected readonly horasTotales = computed(
    () => this.coleccion.reduce((acc, j) => acc + j.horasJugadas, 0),
  );

  protected readonly recientes = computed(() => this.coleccion.slice(0, 4));
}
