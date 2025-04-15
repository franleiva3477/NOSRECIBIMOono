



import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LibrosService } from 'src/app/servicios/libros.service';
import { EditorialesService } from 'src/app/servicios/editoriales.service';
import { MateriasService } from 'src/app/servicios/materias.service';
import { AutoresService } from 'src/app/servicios/autores.service';



@Component({
  selector: 'app-libros-editar',
  templateUrl: './libros-editar.component.html',
  styleUrls: ['./libros-editar.component.css']
})
export class LibrosEditarComponent implements OnInit {
  formularioDeLibros: FormGroup;
  idLibro: any;
  editoriales: any = [];
  listadosignaturas:any=[];
  listadoMaterias: any = [];
  listadoautores: any =[];

  constructor(
    public formulario: FormBuilder,
    private activeRoute: ActivatedRoute,
    private libroService: LibrosService,
    private editorialesService: EditorialesService,
    private materiasService: MateriasService,
    private autoresService: AutoresService,
    public ruteador: Router
  ) {

   
   
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
    }
    );

    


    // obtiene el ID 
    this.idLibro = this.activeRoute.snapshot.paramMap.get('id');

    
    this.formularioDeLibros = this.formulario.group({
      libTitulo: ['', [Validators.required]],
      libAnio: ['', [Validators.required]],
      EditorialID: ['', [Validators.required]],
      autorID: ['', [Validators.required]],
      MateriaID: ['', [Validators.required]],
      libNotDeaContenido: ['', [Validators.required]]
    });

    
    this.libroService.obtenerLibro(this.idLibro).subscribe(respuesta => {
      console.log(respuesta);
      this.formularioDeLibros.patchValue({
        libTitulo: respuesta[0]['libTitulo'],
        libAnio: respuesta[0]['libAnio'],
        EditorialID: respuesta[0]['EditorialID'],
        autorID: respuesta[0]['autorID'],
        MateriaID: respuesta[0]['MateriaID'],
        libNotDeaContenido: respuesta[0]['libNotDeaContenido']
      });
    });
  }

  ngOnInit(): void {

  }
  hasErrors(controlName: string, errorType: string) {
    return this.formularioDeLibros.get(controlName)?.hasError(errorType) && this.formularioDeLibros.get(controlName)?.touched;
    }


  actualizarLibro(): void {
    if (this.formularioDeLibros.valid) {
      const datosLibro = {
        ...this.formularioDeLibros.value
      };
 
      this.libroService.actualizarLibro(this.idLibro, datosLibro).subscribe(
        () => {
          console.log('Libro actualizado con éxito');
      
          this.ruteador.navigateByUrl('/libros-listar');
        }
      );
    } else {
      console.error('Formulario inválido');
    }
  }
}