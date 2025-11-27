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

<<<<<<< HEAD
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
=======
  private API = 'http://localhost/NOSRECIBIMOono/api/personas.php'; 
  
  constructor(private http: HttpClient) {}

  // LISTAR TODAS LAS PERSONAS
  getPersonas(): Observable<Personas[]> {
    return this.http.get<Personas[]>(this.API);
  }

  // OBTENER UNA PERSONA POR ID
  getPersona(idPersona: string): Observable<Personas> {
    return this.http.get<Personas>(`${this.API}?idPersona=${idPersona}`);
  }

  // ACTUALIZAR PERSONA
  updatePersona(persona: any) {
    return this.http.put(this.API, persona);
>>>>>>> 2913bb3743260adfe5d8c1542453edde61d8141e
  }
}
