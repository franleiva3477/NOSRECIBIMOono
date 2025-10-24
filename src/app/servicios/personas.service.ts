import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Personas {
  idPersona: string;
  perNombre:string;
  perApellido: string;
  perDni: string;
  perContrasena: string;
  rolID: string;
}

@Injectable({
  providedIn: 'root'
})
export class PersonasService {
  private api = 'http://localhost/NOSRECIBIMOono/api/personas.php';

  constructor(private clienteHttp: HttpClient) {}

  ObtenerPersonas(): Observable<Personas[]> {
    return this.clienteHttp.get<Personas[]>(this.api);
  }
  ObtenerPersona(id:any):Observable<any>{
    return this.clienteHttp.get(`http://localhost/NOSRECIBIMOono/api/personas.php?idPersonas=${id}`);
  }  
}