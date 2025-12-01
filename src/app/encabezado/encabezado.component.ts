import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent implements OnInit {
  usuario: any = null;
  mostrarEncabezado = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        // Muestro u ocultar el header
        this.mostrarEncabezado = !['/login', '/registro'].includes(event.url);

        // antualio los datos del usuario si existen y lo muestra en el encabezado
      const token = localStorage.getItem('token');
        const datos = localStorage.getItem('usuario');

        if (!token || !datos) {
          this.usuario = null;
        } else {
          this.usuario = JSON.parse(datos);
        }
      });
  }
// hago que recargue el encabezado y vuelva al login
  logout(): void {
     this.router.navigate(['/login']);
    localStorage.clear();
    this.usuario = null;
   
  }
  // y aca que cada vez qye toque otro lugar vuelva al inicio segun rl rol
  irAlInicio() {
  const rol = localStorage.getItem('rol');
  if (rol === 'bibliotecario') {
    this.router.navigate(['/dash-prof']);
  } else if (rol === 'estudiante') {
    this.router.navigate(['/dash-estudiantes']);
  } else {
    this.router.navigate(['/login']);
  }
}

}
