import { Component } from '@angular/core';
import { LibrosService } from 'src/app/servicios/libros.service';
import {  PersonasService } from 'src/app/servicios/personas.service';
import { Router } from '@angular/router';
import { PrestamosService } from 'src/app/servicios/prestamos.service';

@Component({
  selector: 'app-prestamos-libros',
  templateUrl: './prestamos-libros.component.html',
  styleUrls: ['./prestamos-libros.component.css']
})
export class PrestamosLibrosComponent {
  prestamos:any[]=[];
  personas:any[]=[];
  libros:any[]=[];

  constructor(
      private routeador: Router,
      private servicioPersonas: PersonasService,
      private servicioLibros: LibrosService,
      private prestamosService: PrestamosService
  
    ){}
  ngOnInit() {

    this.cargarPrestamos();
  }
  cargarPrestamos() {
      this.prestamosService.obtenerPrestamos().subscribe((respuesta) => {
        console.log(respuesta);
        this.prestamos = respuesta;
      
      });
    }

    CancelarPrestamo(idPrestamo: any, idControl: any) {
      console.log(idPrestamo);
      console.log(idControl);
  
      if (window.confirm('¿Desea cancelar el prestamo?')) {
        this.prestamosService.CancelarPrestamo(idPrestamo).subscribe((respuesta) => {
          this.prestamos.splice(idControl, 1);
          this.routeador.navigateByUrl('/prestamos');
          ; 
  
          window.location.href = window.location.href;
        });
      }
    }

    
  };


