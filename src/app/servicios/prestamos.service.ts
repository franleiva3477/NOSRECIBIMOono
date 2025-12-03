import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Prestamo {
  idPrestamo?: number;
  personaID: number;
  libroID: number;
  presFechaSal: string;
  presFechaDev: string;
  presObservacion: string;
}

@Injectable({
  providedIn: 'root'
})
export class PrestamosService {

  API: string = "http://localhost/NOSRECIBIMOono/api/prestamos.php";

  constructor(private clienteHttp: HttpClient) {}

  obtenerPrestamos(): Observable<any> {
    return this.clienteHttp.get(this.API);
  }

  obtenerPrestamosPorPersona(personaID: number): Observable<any> {
    return this.clienteHttp.get(`${this.API}?personaID=${personaID}`);
  }

  crearPrestamo(datosPrestamos: Prestamo): Observable<any> {
    return this.clienteHttp.post(this.API, datosPrestamos);
  }


  eliminarPrestamo(idPrestamo: number): Observable<any> {
    return this.clienteHttp.delete(`${this.API}?idPrestamo=${idPrestamo}`);
  }

}
