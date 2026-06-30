import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MOCK_COLECCION } from '../../shared/data/mock-juegos';
import { ESTADO_LABEL } from '../../shared/models/juego-coleccion.model';

@Component({
  selector: 'app-juego-detalle',
  imports: [DatePipe],
  templateUrl: './juego-detalle.component.html',
  styleUrl: './juego-detalle.component.css',
})
export class JuegoDetalleComponent {
  private readonly route = inject(ActivatedRoute);

  protected readonly estadoLabel = ESTADO_LABEL;
  protected readonly resena = signal('');

  protected readonly juego = computed(() => {
    const id = this.route.snapshot.paramMap.get('id');
    return MOCK_COLECCION.find((j) => j.id === id) ?? MOCK_COLECCION[0];
  });
}
