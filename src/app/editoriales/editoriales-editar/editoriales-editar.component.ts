import { Component } from '@angular/core';

import { OnInit } from '@angular/core';

import { FormBuilder, FormGroup, MinLengthValidator, Validators } from '@angular/forms';
import { Route, ActivatedRoute, Router } from '@angular/router';
import { EditorialesService } from 'src/app/servicios/editoriales.service';


@Component({
  selector: 'app-editoriales-editar',
  templateUrl: './editoriales-editar.component.html',
  styleUrls: ['./editoriales-editar.component.css']
})
export class EditorialesEditarComponent implements OnInit {


  selectedOption:any;

  ngOnInit(): void {
   
    
  }

  formularioEditoriales: FormGroup;

  idEditorial:any;


  constructor(
    public formulario:FormBuilder,
    private activeRoute:ActivatedRoute,
    private servicioEditoriales:EditorialesService,
    public ruteador:Router,
  

  ){

    this.idEditorial = activeRoute.snapshot.paramMap.get('id');
    console.log(this.idEditorial);

    this.servicioEditoriales.ObtenerEditorial(this.idEditorial).subscribe((respuesta)=>{
      console.log(respuesta);
      this.formularioEditoriales.setValue({
        idEditorial:respuesta[0]['idEditorial'],
        ediNombre:respuesta[0]['ediNombre'],
        ediDireccion:respuesta[0]['ediDireccion'],
        ediTelefono:respuesta[0]['ediTelefono'],
        ediEmail:respuesta[0]['ediEmail'],
       
      })
      
    });


    this.formularioEditoriales = this.formulario.group({
      idEditorial:[''],
      ediNombre:['', [Validators.required, Validators.minLength(4)]],
      ediDireccion:['', [Validators.required]],
      ediTelefono:['', [Validators.required,Validators.pattern('^[0-9]+$')]],
      ediEmail:['', [Validators.required, Validators.email]],
   
    });

  }

  hasErrors(controlName: string, errorType: string) {
    return this.formularioEditoriales.get(controlName)?.hasError(errorType) && this.formularioEditoriales.get(controlName)?.touched;
    }

  
    enviarDatos():any{
      console.log(this.idEditorial); 
      console.log(this.formularioEditoriales.value);
      this.servicioEditoriales.EditarEditorial(this.formularioEditoriales.value).subscribe((respuesta)=>{
        console.log(respuesta);
        this.ruteador.navigateByUrl('/editoriales-listar');
      });
    }
  
}