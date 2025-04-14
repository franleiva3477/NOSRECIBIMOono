import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


export interface Editorial{
  idEditorial?: String;
  ediNombre: String;
  ediTelefono: String;
  ediEmail: String;
  ediDireccion: String;
  LocalidadID?: String;
  locNombre: String;
  
}

@Injectable({
  providedIn: 'root'
})
export class EditorialesService {

  API: string = 'http://localhost/NOSRECIBIMOono/api/editoriales.php';

  constructor(private clienteHttp:HttpClient) { }

  ObtenerEditoriales():Observable<Editorial[]>{
    return this.clienteHttp.get<Editorial[]>(this.API)
  }

  AgregarEditorial(datosEditorial:Editorial):Observable<any>{
    return this.clienteHttp.post(this.API,datosEditorial);
  }

  
  BorrarEditorial(id:any){
    return this.clienteHttp.delete(`http://localhost/prueba/api/editoriales.php?idEditorial=${id}`);
  }
  
  ObtenerEditorial(id:any):Observable<any>{
    return this.clienteHttp.get(`http://localhost/prueba/api/editoriales.php?idEditorial=${id}`);
  }  



  EditarEditorial(datosEditorial:Editorial){
    return this.clienteHttp.put(this.API,datosEditorial);
  }


}

