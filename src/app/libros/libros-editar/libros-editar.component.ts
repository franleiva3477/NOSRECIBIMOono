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

  formularioDeLibros!: FormGroup;
  idLibro: any;

  editoriales: any = [];
  listadoMaterias: any = [];
  listadoautores: any = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private libroService: LibrosService,
    private editorialesService: EditorialesService,
    private materiasService: MateriasService,
    private autoresService: AutoresService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.idLibro = this.route.snapshot.paramMap.get('id');

    this.formularioDeLibros = this.fb.group({
      libTitulo: ['', Validators.required],
      libAnio: ['', [Validators.required, Validators.minLength(4), Validators.pattern('^[0-9]+$')]],
      EditorialID: ['', Validators.required],
      autorID: ['', Validators.required],
      materiaID: ['', Validators.required],
      libNotaDeContenido: ['', Validators.required]
    });

    // cargar combos
    this.editorialesService.ObtenerEditoriales().subscribe(r => this.editoriales = r);
    this.materiasService.ObtenerMaterias().subscribe(r => this.listadoMaterias = r);
    this.autoresService.getAutor().subscribe(r => this.listadoautores = r);

    // cargar datos del libro
    this.libroService.obtenerLibro(this.idLibro).subscribe(respuesta => {
      this.formularioDeLibros.patchValue(respuesta[0]);
    });

  }

  hasErrors(control: string, error: string) {
    const c = this.formularioDeLibros.get(control);
    return c?.hasError(error) && c?.touched;
  }

  actualizarLibro(): void {
    if (this.formularioDeLibros.invalid) {
      this.formularioDeLibros.markAllAsTouched();
      return;
    }

    this.libroService.actualizarLibro(this.idLibro, this.formularioDeLibros.value)
      .subscribe(() => {
        this.router.navigateByUrl('/libros-listar');
      });
  }

}
