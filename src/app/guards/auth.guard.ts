import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('token');
    const rol = localStorage.getItem('rol');

    // Si no hay token no tiene sesion activa
    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    
    const rolPermitido = route.data['rol'] as string;
    if (rolPermitido && rol !== rolPermitido) {
      
      if (rol === 'estudiante') {
        this.router.navigate(['/dash-estudiantes']);
      } else if (rol === 'bibliotecario') {
        this.router.navigate(['/dash-prof']);
      } else {
        this.router.navigate(['/login']);
      }

      return false;
    }

    return true; // todo ok, puede acceder
  }
}
