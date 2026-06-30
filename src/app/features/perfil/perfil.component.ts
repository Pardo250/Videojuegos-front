import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameCardComponent } from '../../shared/ui/game-card/game-card.component';
import { StatCardComponent } from '../../shared/ui/stat-card/stat-card.component';
import { MOCK_COLECCION } from '../../shared/data/mock-juegos';

@Component({
  selector: 'app-perfil',
  imports: [GameCardComponent, StatCardComponent],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css',
})
export class PerfilComponent {
  private readonly route = inject(ActivatedRoute);

  protected readonly usuario = computed(() => this.route.snapshot.paramMap.get('usuario') ?? 'jugador');
  protected readonly coleccion = MOCK_COLECCION;

  protected readonly totalJuegos = computed(() => this.coleccion.length);
  protected readonly horasTotales = computed(() =>
    this.coleccion.reduce((acc, j) => acc + j.horasJugadas, 0),
  );
  protected readonly completados = computed(
    () => this.coleccion.filter((j) => j.estado === 'completado').length,
  );
}
