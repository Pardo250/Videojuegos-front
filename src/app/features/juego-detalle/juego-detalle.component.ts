import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ColeccionService } from '../../core/services/coleccion.service';
import { JuegoService } from '../../core/services/juego.service';
import { mapJuegoColeccionResponse } from '../../shared/models/coleccion.mapper';
import { ESTADO_LABEL, JuegoColeccion } from '../../shared/models/juego-coleccion.model';
import { ResenaResponse } from '../../core/models/coleccion.model';

@Component({
  selector: 'app-juego-detalle',
  imports: [DatePipe],
  templateUrl: './juego-detalle.component.html',
  styleUrl: './juego-detalle.component.css',
})
export class JuegoDetalleComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly coleccionService = inject(ColeccionService);
  private readonly juegoService = inject(JuegoService);

  protected readonly estadoLabel = ESTADO_LABEL;
  protected readonly juego = signal<JuegoColeccion | null>(null);
  protected readonly resena = signal('');
  protected readonly cargando = signal(true);
  protected readonly errorCarga = signal('');
  protected readonly guardando = signal(false);
  protected readonly mensajeGuardado = signal('');

  private readonly resenasCargadas = signal<ResenaResponse[]>([]);
  protected readonly cargandoResenas = signal(false);

  protected readonly resenas = computed(() =>
    [...this.resenasCargadas()].sort(
      (a, b) => new Date(b.fechaCreacion).getTime() - new Date(a.fechaCreacion).getTime(),
    ),
  );

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.coleccionService.listar().subscribe({
      next: (respuesta) => {
        const encontrado = respuesta.map(mapJuegoColeccionResponse).find((j) => j.id === id) ?? null;
        this.juego.set(encontrado);
        this.cargando.set(false);

        if (!encontrado) {
          this.errorCarga.set('No encontramos este juego en tu colección.');
          return;
        }

        this.cargarResenas(encontrado.rawgId);
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error al cargar la colección (GET /api/coleccion):', err);
        this.errorCarga.set(
          `No se pudo cargar el juego (${err.status || 'sin conexión'}): ${err.error?.mensaje ?? err.message}`,
        );
        this.cargando.set(false);
      },
    });
  }

  private cargarResenas(rawgId: number | undefined): void {
    if (!rawgId) return;

    this.cargandoResenas.set(true);
    this.juegoService.listarResenas(rawgId).subscribe({
      next: (respuesta) => {
        this.resenasCargadas.set(respuesta);
        this.cargandoResenas.set(false);
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error al cargar reseñas (GET /api/juegos/:rawgId/resenas):', err);
        this.cargandoResenas.set(false);
      },
    });
  }

  guardarResena(): void {
    const j = this.juego();
    if (!j || !j.rawgId || !this.resena().trim()) return;

    this.guardando.set(true);
    this.mensajeGuardado.set('');

    this.juegoService
      .crearResena(j.rawgId, {
        resena: this.resena().trim(),
        ratingPersonal: j.rating > 0 ? j.rating : undefined,
      })
      .subscribe({
        next: () => {
          this.guardando.set(false);
          this.mensajeGuardado.set('Reseña publicada.');
          this.resena.set('');
          this.cargarResenas(j.rawgId);
        },
        error: (err: HttpErrorResponse) => {
          console.error('Error al publicar la reseña (POST /api/juegos/:rawgId/resenas):', err);
          this.guardando.set(false);
          this.mensajeGuardado.set(
            `No se pudo guardar (${err.status || 'sin conexión'}): ${err.error?.mensaje ?? err.message}`,
          );
        },
      });
  }
}
