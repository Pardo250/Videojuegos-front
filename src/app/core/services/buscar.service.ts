import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { JuegoResumenResponse } from '../models/coleccion.model';

@Injectable({ providedIn: 'root' })
export class BuscarService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/buscar`;

  buscar(query: string, pagina = 1): Observable<JuegoResumenResponse[]> {
    const params = new HttpParams().set('query', query).set('pagina', pagina);
    return this.http.get<JuegoResumenResponse[]>(this.baseUrl, { params });
  }
}
