import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Personas {
  idPersona: number;
  perNombre: string;
  perApellido: string;
  perDni: string;
  perContrasena?: string;
  rolID?: number;
  rolNombre?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PersonasService {
  [x: string]: any;

 private API = 'http://localhost/NOSRECIBIMOono/api/personas.php';

  constructor(private clienteHttp: HttpClient) {}

  getPersonas(): Observable<Personas[]> {
    return this.clienteHttp.get<Personas[]>(this.API);
  }

  getPersona(idPersona: number): Observable<Personas> {
    return this.clienteHttp.get<Personas>(`${this.API}?idPersona=${idPersona}`);
  }

  updatePersona(persona: Personas) {
    return this.clienteHttp.put(this.API, persona);
  }
  borrarpersona(idPersona: any): Observable<any> {
    return this.clienteHttp.delete(`${this.API}?idPersona=${idPersona}`);
  }
}
