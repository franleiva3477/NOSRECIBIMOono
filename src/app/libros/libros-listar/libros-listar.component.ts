import { Component } from '@angular/core';
import { Libro, LibrosService } from 'src/app/servicios/libros.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-libros-listar',
  templateUrl: './libros-listar.component.html',
  styleUrls: ['./libros-listar.component.css']
})
export class LibrosListarComponent {
  libros: any[]=[];
  

  constructor(
    private routeador: Router,

    private servicioLibros: LibrosService

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


}
