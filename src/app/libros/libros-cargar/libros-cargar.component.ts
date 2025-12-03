import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LibrosService, Libro } from 'src/app/servicios/libros.service';
import { EditorialesService } from 'src/app/servicios/editoriales.service';
import { MateriasService } from 'src/app/servicios/materias.service';
import { AutoresService } from 'src/app/servicios/autores.service';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-libros-agregado',
  templateUrl: './libros-cargar.component.html',
  styleUrls: ['./libros-cargar.component.css']
})
export class LibrosCargarComponent implements OnInit{

  formularioDeLibros:FormGroup;
  editoriales: any = [];
  listadoMaterias: any = [];
  listadoautores: any=[];

  
  constructor(public formulario:FormBuilder,
    private servicioLibros:LibrosService,
   private editorialesService: EditorialesService,
    private materiasService: MateriasService,
    private autoresService: AutoresService,
    private routeador: Router,
    private rutaActiva: ActivatedRoute

  ){
    
    this.formularioDeLibros=this.formulario.group({
      libTitulo: ['', [Validators.required, Validators.minLength(4)]],
      libAnio: ['', [Validators.required,Validators.minLength(4),Validators.pattern('^[0-9]+$')]], 
      EditorialID: ['', [Validators.required]],
      autorID: ['', [Validators.required]],
      materiaID: [null, [Validators.required]],
      libNotaDeContenido: ['', [Validators.required]]
    })
   }
  ngOnInit(): void {
    this.editorialesService.ObtenerEditoriales().subscribe((respuesta) => {
      console.log(respuesta);
       this.editoriales= respuesta;
     });

     this.materiasService.ObtenerMaterias().subscribe((respuesta)=>{
      console.log(respuesta);
      this.listadoMaterias = respuesta;
    });

    this.autoresService.getAutor().subscribe((respuesta)=>{
      console.log(respuesta);
      this.listadoautores= respuesta;
    });
    
 
  }

  hasErrors(controlName: string, errorType: string) {
    return this.formularioDeLibros.get(controlName)?.hasError(errorType) && this.formularioDeLibros.get(controlName)?.touched;
    }

  cargarLibros(): any {
    console.log("Formulario enviado:", this.formularioDeLibros.value); 
    this.servicioLibros.agregarLibros(this.formularioDeLibros.value).subscribe(
      (respuesta) => {
        console.log("Libro agregado:", respuesta);
        this.routeador.navigateByUrl('/libros-listar');
      }
    );
  }
  
  
  
}