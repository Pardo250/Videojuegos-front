import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  ActualizarColeccionRequest,
  AgregarColeccionRequest,
  EstadoJuegoApi,
  JuegoColeccionResponse,
} from '../models/coleccion.model';

@Injectable({ providedIn: 'root' })
export class ColeccionService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/coleccion`;

  listar(estado?: EstadoJuegoApi): Observable<JuegoColeccionResponse[]> {
    const params = estado ? new HttpParams().set('estado', estado) : undefined;
    return this.http.get<JuegoColeccionResponse[]>(this.baseUrl, { params });
  }

  agregar(datos: AgregarColeccionRequest): Observable<JuegoColeccionResponse> {
    return this.http.post<JuegoColeccionResponse>(this.baseUrl, datos);
  }

  actualizar(id: number, datos: ActualizarColeccionRequest): Observable<JuegoColeccionResponse> {
    return this.http.put<JuegoColeccionResponse>(`${this.baseUrl}/${id}`, datos);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
