import { Component, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, debounceTime, distinctUntilChanged, of, switchMap, tap } from 'rxjs';
import { BuscarService } from '../../core/services/buscar.service';
import { ColeccionService } from '../../core/services/coleccion.service';
import { JuegoResumenResponse } from '../../core/models/coleccion.model';

@Component({
  selector: 'app-buscar',
  imports: [DatePipe],
  templateUrl: './buscar.component.html',
  styleUrl: './buscar.component.css',
})
export class BuscarComponent {
  private readonly buscarService = inject(BuscarService);
  private readonly coleccionService = inject(ColeccionService);

  protected readonly query = signal('');
  protected readonly cargando = signal(false);
  protected readonly errorBusqueda = signal('');
  protected readonly agregados = signal<Set<number>>(new Set());
  protected readonly agregando = signal<Set<number>>(new Set());

  private readonly query$ = toObservable(this.query).pipe(debounceTime(400), distinctUntilChanged());

  protected readonly resultados = toSignal(
    this.query$.pipe(
      switchMap((valor) => {
        const termino = valor.trim();
        this.errorBusqueda.set('');
        this.cargando.set(true);

        return this.buscarService.buscar(termino).pipe(
          tap(() => this.cargando.set(false)),
          catchError((err: HttpErrorResponse) => {
            console.error('Error al buscar en RAWG (GET /api/buscar):', err);
            this.cargando.set(false);
            this.errorBusqueda.set(
              `No se pudo buscar (${err.status || 'sin conexión'}): ${err.error?.mensaje ?? err.message}`,
            );
            return of<JuegoResumenResponse[]>([]);
          }),
        );
      }),
    ),
    { initialValue: [] as JuegoResumenResponse[] },
  );

  agregar(juego: JuegoResumenResponse): void {
    this.agregando.update((set) => new Set(set).add(juego.rawgId));

    this.coleccionService.agregar({ rawgId: juego.rawgId, estado: 'PENDIENTE' }).subscribe({
      next: () => {
        this.agregando.update((set) => {
          const copia = new Set(set);
          copia.delete(juego.rawgId);
          return copia;
        });
        this.agregados.update((set) => new Set(set).add(juego.rawgId));
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error al agregar a la colección (POST /api/coleccion):', err);
        this.agregando.update((set) => {
          const copia = new Set(set);
          copia.delete(juego.rawgId);
          return copia;
        });
      },
    });
  }
}
