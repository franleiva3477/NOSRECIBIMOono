import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Libro{
  idLibro?: string;
  libTitulo: string;
  libCantidad: string;
  libAnio: string;
  editorial: string;
  materiaID: string;
  libNotaContenido: string;
}

@Injectable({
  providedIn: 'root'
})
export class LibrosService {

  private api='http://localhost/NOSRECIBIMOono/api/libros.php'

  constructor(private clienteHttp: HttpClient) { }

  obtenerlibros():Observable<Libro[]>{
    return this.clienteHttp.get<Libro[]>(this.api);
  }
  agregarLibros(libro:Libro):Observable<any>{
    return this.clienteHttp.post(this.api,libro);
  }
  borrarlibro(idLibro: any): Observable<any> {
    return this.clienteHttp.delete(`${this.api}?idLibro=${idLibro}`);
  }
  obtenerLibro(idLibro: any): Observable<any> {
    return this.clienteHttp.get(`${this.api}?idLibro=${idLibro}`);
  }
  actualizarLibro(idLibro: string, datosLibro: any): Observable<any> {
    return this.clienteHttp.put(`${this.api}?idLibro=${idLibro}`, datosLibro);
  }
}
