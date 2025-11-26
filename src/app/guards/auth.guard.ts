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

    // Si no hay token => sesión no iniciada
    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    // Si la ruta tiene restricción de rol, validarla
    const rolPermitido = route.data['rol'] as string;
    if (rolPermitido && rol !== rolPermitido) {
      this.router.navigate(['/login']);
      return false;
    }

    return true; // todo ok, puede acceder
  }
}
