import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Libro{
  idLibro?: string;
  libTitulo: string;
  libCantidad: string;
  libAnio: string;
  ediNombre: string;
  editorialID: string;
  materiaID: string;
  matNombre: string;
  libNotaContenido: string;
}

@Injectable({
  providedIn: 'root'
})
export class LibrosService {

  private API='http://localhost/NOSRECIBIMOono/apiconjwt/libros.php'

  constructor(private clienteHttp: HttpClient) { }

  obtenerlibros():Observable<Libro[]>{
    const headers = new  HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
    return this.clienteHttp.get<Libro[]>(this.API,{headers});
  }
  agregarLibros(libro:Libro):Observable<any>{
    const headers = new HttpHeaders({
      'Authorization':  `Bearer ${localStorage.getItem('token')}`
    })
    return this.clienteHttp.post(this.API,libro,{headers});
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
