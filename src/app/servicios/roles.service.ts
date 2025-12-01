



import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  API = "http://localhost/NOSRECIBIMOono/api/roles.php";

  constructor(private clienteHttp: HttpClient) {}

  getRoles(): Observable<any> {
    return this.clienteHttp.get(this.API); // obtiene roles
  }
}
