import { Component } from '@angular/core';
import { Libro, LibrosService } from 'src/app/servicios/libros.service';
import { Router } from '@angular/router';
import { PrestamosService } from 'src/app/servicios/prestamos.service';


@Component({
  selector: 'app-libros-listar',
  templateUrl: './libros-listar.component.html',
  styleUrls: ['./libros-listar.component.css']
})
export class LibrosListarComponent {
  libros: any[]=[];
  editorial:any[]=[];
 
  

  constructor(
    private routeador: Router,

    private servicioLibros: LibrosService,
    private prestamosService: PrestamosService

  ){}
  ngOnInit() {
    this.cargarLibros();
  }
  
    cargarLibros() {
      this.servicioLibros.obtenerlibros().subscribe((respuesta) => {
        console.log(respuesta);
        this.libros = respuesta;
      
      });
    }
    borrarLibro(idLibro: any, idControl: any) {
      console.log(idLibro);
      console.log(idControl);
  
      if (window.confirm('¿Desea borrar el registro?')) {
        this.servicioLibros.borrarlibro(idLibro).subscribe((respuesta) => {
          this.libros.splice(idControl, 1);
          this.routeador.navigateByUrl('/biblioteca/libros-listar');
          ; 
  
          window.location.href = window.location.href;
        });
      }
    }
    esProf() {
  return localStorage.getItem('rol') === 'bibliotecario';
}

pedirPrestamo(libro: any) {
  alert
}

}
