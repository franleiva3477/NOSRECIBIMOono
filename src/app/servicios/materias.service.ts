import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Materias {
  idMateria: string;
  matNombre: string;
}

@Injectable({
  providedIn: 'root'
})
export class MateriasService {
  private api = 'http://localhost/prueba/api/materias.php';

  constructor(private clienteHttp: HttpClient) {}

  ObtenerMaterias(): Observable<Materias[]> {
    return this.clienteHttp.get<Materias[]>(this.api);
  }
}