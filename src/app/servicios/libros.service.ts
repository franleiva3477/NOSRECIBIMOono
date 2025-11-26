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

  private API='http://localhost/NOSRECIBIMOono/api/libros.php'

  constructor(private clienteHttp: HttpClient) { }

  obtenerlibros():Observable<Libro[]>{
    return this.clienteHttp.get<Libro[]>(this.API);
  }
  agregarLibros(libro:Libro):Observable<any>{
    return this.clienteHttp.post(this.API,libro);
  }
  borrarlibro(idLibro: any): Observable<any> {
    return this.clienteHttp.delete(`${this.API}?idLibro=${idLibro}`);
  }
  obtenerLibro(idLibro: any): Observable<any> {
    return this.clienteHttp.get(`${this.API}?idLibro=${idLibro}`);
  }
  actualizarLibro(idLibro: string, datosLibro: any): Observable<any> {
    return this.clienteHttp.put(`${this.API}?idLibro=${idLibro}`, datosLibro);
  }
}
