import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { StatCardComponent } from '../../shared/ui/stat-card/stat-card.component';
import { GameCardComponent } from '../../shared/ui/game-card/game-card.component';
import { ColeccionService } from '../../core/services/coleccion.service';
import { mapJuegoColeccionResponse } from '../../shared/models/coleccion.mapper';
import { JuegoColeccion } from '../../shared/models/juego-coleccion.model';

@Component({
  selector: 'app-dashboard',
  imports: [StatCardComponent, GameCardComponent, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  private readonly coleccionService = inject(ColeccionService);

  private readonly coleccion = signal<JuegoColeccion[]>([]);

  protected readonly cargando = signal(true);
  protected readonly errorCarga = signal('');

  protected readonly totalJuegos = computed(() => this.coleccion().length);
  protected readonly completados = computed(
    () => this.coleccion().filter((j) => j.estado === 'completado').length,
  );
  protected readonly jugando = computed(
    () => this.coleccion().filter((j) => j.estado === 'jugando').length,
  );
  protected readonly horasTotales = computed(
    () => this.coleccion().reduce((acc, j) => acc + j.horasJugadas, 0),
  );

  protected readonly recientes = computed(() =>
    [...this.coleccion()]
      .sort((a, b) => new Date(b.fechaAgregado ?? 0).getTime() - new Date(a.fechaAgregado ?? 0).getTime())
      .slice(0, 4),
  );

  ngOnInit(): void {
    this.coleccionService.listar().subscribe({
      next: (respuesta) => {
        this.coleccion.set(respuesta.map(mapJuegoColeccionResponse));
        this.cargando.set(false);
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error al cargar el dashboard (GET /api/coleccion):', err);
        this.errorCarga.set(
          `No se pudo cargar tu colección (${err.status || 'sin conexión'}): ${err.error?.mensaje ?? err.message}`,
        );
        this.cargando.set(false);
      },
    });
  }
}
