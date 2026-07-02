import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CrearResenaRequest, ResenaResponse } from '../models/coleccion.model';

@Injectable({ providedIn: 'root' })
export class JuegoService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/juegos`;

  listarResenas(rawgId: number): Observable<ResenaResponse[]> {
    return this.http.get<ResenaResponse[]>(`${this.baseUrl}/${rawgId}/resenas`);
  }

  crearResena(rawgId: number, datos: CrearResenaRequest): Observable<ResenaResponse> {
    return this.http.post<ResenaResponse>(`${this.baseUrl}/${rawgId}/resenas`, datos);
  }
}
