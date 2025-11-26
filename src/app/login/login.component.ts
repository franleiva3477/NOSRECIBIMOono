import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  Dni = '';
  contrasena = '';
  error = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    const datos = {
      Dni: this.Dni,
      contrasena: this.contrasena
    };

    this.http.post<any>('http://localhost/NOSRECIBIMOono/api/login.php', datos).subscribe({
      next: (resp) => {

        if (!resp.success) {
          this.error = resp.mensaje;
          return;
        }

        localStorage.setItem('token', resp.token);
        localStorage.setItem('rol', resp.rol);
        localStorage.setItem('usuario', JSON.stringify(resp.usuario));

        if (resp.rol === 'bibliotecario') {
          this.router.navigate(['/dash-prof']);
        } 
        else if (resp.rol === 'estudiante') {
          this.router.navigate(['/dash-estudiantes']);
        } 
        else {
          this.error = 'Rol desconocido.';
        }

      },
      error: () => {
        this.error = 'Error al conectar con el servidor.';
      }
    });
  }
}
