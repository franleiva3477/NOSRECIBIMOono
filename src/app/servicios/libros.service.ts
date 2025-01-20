import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Libro{
  idLibro?: string;
  libTitulo: string;
  libCantidad: string;
  libNotaContenido: string;
  libAnio: string;
  sigtopografica: string;
  editorial: string;

}

@Injectable({
  providedIn: 'root'
})
export class LibrosService {

  private api='http://localhost/prueba/api/libros.php'

  constructor(private clienteHttp: HttpClient) { }

  obtenerlibros():Observable<Libro[]>{
    return this.clienteHttp.get<Libro[]>(this.api);
  }
}
