import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { httpOptions } from '../config/httpOptions';
import { CategoriaModel } from './categoria.model';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  apiUrl = `${environment.apiUrl}/categorias`;

  categorias = [];
  constructor(private readonly _http: HttpClient) {}

  getCategorias(): Observable<any> {
    return this._http.get(this.apiUrl);
  }

  createCategoria(categoria: any): Observable<any> {
    return this._http.post(this.apiUrl, categoria, httpOptions);
  }

  updateCategoria(categoria: any): Observable<CategoriaModel> {
    return this._http.put<CategoriaModel>(`${this.apiUrl}/${categoria.id}`, categoria, httpOptions);
  }

  deleteCategoria(id: number): Observable<{}> {
    return this._http.delete(`${this.apiUrl}/${id}`, httpOptions);
  }
}
