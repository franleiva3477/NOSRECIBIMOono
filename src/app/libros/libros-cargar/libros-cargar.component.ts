import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LibrosService } from 'src/app/servicios/libros.service';
import { EditorialesService } from 'src/app/servicios/editoriales.service';
import { MateriasService } from 'src/app/servicios/materias.service';
import { AutoresService } from 'src/app/servicios/autores.service';

@Component({
  selector: 'app-libros-agregado',
  templateUrl: './libros-cargar.component.html',
  styleUrls: ['./libros-cargar.component.css']
})
export class LibrosCargarComponent implements OnInit {

  formularioDeLibros: FormGroup;
  editoriales: any[] = [];
  listadoMaterias: any[] = [];
  listadoautores: any[] = [];

  constructor(
    private fb: FormBuilder,
    private servicioLibros: LibrosService,
    private editorialesService: EditorialesService,
    private materiasService: MateriasService,
    private autoresService: AutoresService,
    private router: Router
  ) {

    this.formularioDeLibros = this.fb.group({
      libTitulo: ['', [Validators.required, Validators.minLength(4)]],
      libAnio: ['', [Validators.required, Validators.minLength(4), Validators.pattern('^[0-9]+$')]],
      EditorialID: ['', Validators.required],
      autorID: ['', Validators.required],
      materiaID: ['', Validators.required],
      libNotaDeContenido: ['', Validators.required]
    });
  }

  ngOnInit(): void {

    this.editorialesService.ObtenerEditoriales().subscribe(resp => {
      this.editoriales = resp;
    });

    this.materiasService.ObtenerMaterias().subscribe(resp => {
      this.listadoMaterias = resp;
    });

    this.autoresService.getAutor().subscribe(resp => {
      this.listadoautores = resp;
    });
  }

  hasErrors(controlName: string, errorType: string) {
    return this.formularioDeLibros.get(controlName)?.hasError(errorType)
      && this.formularioDeLibros.get(controlName)?.touched;
  }

  cargarLibros() {
    if (this.formularioDeLibros.valid) {
      this.servicioLibros.agregarLibros(this.formularioDeLibros.value).subscribe(() => {
        this.router.navigateByUrl('/libros-listar');
      });
    } else {
      this.formularioDeLibros.markAllAsTouched();
    }
  }
}
