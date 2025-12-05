import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorialesService } from 'src/app/servicios/editoriales.service';

@Component({
  selector: 'app-editoriales-editar',
  templateUrl: './editoriales-editar.component.html',
  styleUrls: ['./editoriales-editar.component.css']
})
export class EditorialesEditarComponent implements OnInit {

  formularioEditoriales!: FormGroup;
  idEditorial: any;

  constructor(
    private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private servicioEditoriales: EditorialesService,
    private ruteador: Router
  ) {}

  ngOnInit(): void {
    this.idEditorial = this.activeRoute.snapshot.paramMap.get('id');

    // Crear formulario primero
    this.formularioEditoriales = this.fb.group({
      idEditorial: [''],
      ediNombre: ['', [Validators.required, Validators.minLength(4)]],
      ediDireccion: ['', Validators.required],
      ediTelefono: ['', [Validators.required, Validators.pattern('^[0-9 -]+$')]],
      ediEmail: ['', [Validators.required, Validators.email]]
    });

    // Luego cargar datos
    this.servicioEditoriales.ObtenerEditorial(this.idEditorial).subscribe(
      (respuesta) => {
        this.formularioEditoriales.setValue({
          idEditorial: respuesta[0]['idEditorial'],
          ediNombre: respuesta[0]['ediNombre'],
          ediDireccion: respuesta[0]['ediDireccion'],
          ediTelefono: respuesta[0]['ediTelefono'],
          ediEmail: respuesta[0]['ediEmail']
        });
      }
    );
  }

  hasErrors(controlName: string, errorType: string) {
    const control = this.formularioEditoriales.get(controlName);
    return control?.hasError(errorType) && control?.touched;
  }

  enviarDatos(): any {
    this.servicioEditoriales.EditarEditorial(this.formularioEditoriales.value)
      .subscribe((respuesta) => {
        console.log(respuesta);
        this.ruteador.navigateByUrl('/editoriales-listar');
      });
  }

}
