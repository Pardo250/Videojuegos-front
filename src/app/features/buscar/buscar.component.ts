import { Component, computed, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MOCK_COLECCION } from '../../shared/data/mock-juegos';

@Component({
  selector: 'app-buscar',
  imports: [DatePipe],
  templateUrl: './buscar.component.html',
  styleUrl: './buscar.component.css',
})
export class BuscarComponent {
  protected readonly query = signal('');
  protected readonly agregados = signal<Set<string>>(new Set());

  private readonly resultadosBase = MOCK_COLECCION;

  protected readonly resultados = computed(() => {
    const q = this.query().trim().toLowerCase();
    if (!q) return this.resultadosBase;
    return this.resultadosBase.filter((j) => j.titulo.toLowerCase().includes(q));
  });

  agregar(id: string): void {
    this.agregados.update((set) => new Set(set).add(id));
  }
}
