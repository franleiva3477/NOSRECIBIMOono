import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LibrosService, Libro } from 'src/app/servicios/libros.service';
//import { EditorialesService } from 'src/app/biblioteca/services/editoriales.service';
//import { MateriasService } from 'src/app/biblioteca/services/materias.service';
//import { SigTopoService } from 'src/app/biblioteca/services/sig-topo.service';
//import { AutoresService } from 'src/app/biblioteca/services/autores.service';


@Component({
  selector: 'app-libros-agregado',
  templateUrl: './libros-cargar.component.html',
  styleUrls: ['./libros-cargar.component.css']
})
export class LibrosCargarComponent implements OnInit{

  formularioDeLibros:FormGroup;
  editoriales: any = [];
  listadosignaturas:any=[];
  listadoMaterias: any = [];
  listadoautores: any =[];

  
  constructor(public formulario:FormBuilder,
    private servicioLibros:LibrosService,
  //  private editorialesService: EditorialesService,
    //private materiasService: MateriasService,
    //private servicioSignaturas: SigTopoService,
    //private autoresService: AutoresService,
    private routeador: Router
  ){
    
    this.formularioDeLibros=this.formulario.group({
      libTitulo: ['', [Validators.required, Validators.minLength(4)]],
      libAnio: ['', [Validators.required,Validators.minLength(4)]], 
      SigTopograficaID: ['', [Validators.required]],
      EditorialID: ['', [Validators.required]],
      libCantidad: ['', [Validators.required]],
      autorID: ['', [Validators.required]],
      MateriaID: ['', [Validators.required]],
      libNotaContenido: ['', [Validators.required]]
    })
   }
  ngOnInit(): void {

    
 
  }

  cargarLibros(): any {
    console.log("Formulario enviado:", this.formularioDeLibros.value); 
    this.servicioLibros.agregarLibros(this.formularioDeLibros.value).subscribe(
      (respuesta) => {
        console.log("Libro agregado:", respuesta);
        this.routeador.navigateByUrl('/biblioteca/libros-listado');
      }
    );
  }
  
  
  
}