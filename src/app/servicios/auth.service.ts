import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost/NOSRECIBIMOono/api/login.php'; // ajustá la URL

  constructor(private http: HttpClient) { }

  login(perDni: string, perContrasena: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { perDni, perContrasena });
  }

  // Guardar usuario en localStorage (para mantener sesión)
  guardarUsuario(usuario: any) {
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }

  obtenerUsuario() {
    return JSON.parse(localStorage.getItem('usuario') || 'null');
  }

  cerrarSesion() {
    localStorage.removeItem('usuario');
  }
}
