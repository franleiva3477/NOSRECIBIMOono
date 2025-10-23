import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
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

    this.http.post<any>('http://localhost/api/login.php', datos).subscribe({
      next: (respuesta) => {
        if (respuesta.token) {
          localStorage.setItem('token', respuesta.token);
          this.router.navigate(['/inicio']); // redirige a tu ruta protegida
        }
      },
      error: (err) => {
        this.error = 'Usuario o contraseña incorrectos.';
        console.error(err);
      }
    });
  }
}
