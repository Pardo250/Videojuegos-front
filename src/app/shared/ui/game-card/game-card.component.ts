import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ESTADO_LABEL, JuegoColeccion } from '../../models/juego-coleccion.model';

@Component({
  selector: 'app-game-card',
  imports: [RouterLink],
  templateUrl: './game-card.component.html',
  styleUrl: './game-card.component.css',
})
export class GameCardComponent {
  readonly juego = input.required<JuegoColeccion>();

  protected readonly estadoLabel = ESTADO_LABEL;
}
