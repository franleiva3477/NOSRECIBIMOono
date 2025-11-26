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
      next: (respuesta) => {
        if (respuesta.success) {
          // Guardamos los datos en localStorage
          localStorage.setItem('token', respuesta.token);
          localStorage.setItem('rol', respuesta.rol);
          localStorage.setItem('usuario', JSON.stringify(respuesta.usuario));

          // 🔹 Redirigir según el rol
          if (respuesta.rol === 'bibliotecario') {
            this.router.navigate(['/dash-prof']); // dashboard de profesor
          } else if (respuesta.rol === 'estudiante') {
            this.router.navigate(['/dash-estudiantes']); // dashboard de estudiante
          } else {
            this.error = 'Rol desconocido. Contacte al administrador.';
          }
        } else {
          this.error = respuesta.mensaje;
        }
      },
      error: (err) => {
        console.error(err);
        this.error = 'Error al conectar con el servidor.';
      }
    });
  }
}
