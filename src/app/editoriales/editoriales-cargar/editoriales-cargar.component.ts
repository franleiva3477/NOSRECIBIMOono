import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { EditorialesService } from 'src/app/servicios/editoriales.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-editorial-cargar',
  templateUrl: './editoriales-cargar.component.html',
  styleUrls: ['./editoriales-cargar.component.css']
})


export class EditorialesCargarComponent {

  alertEnvio: boolean = false;
  
  alertCorrecto: boolean = false;

  formularioEditoriales: FormGroup;
  localidades: any;

  constructor(
    private servicioEditoriales:EditorialesService,
    public formulario: FormBuilder,
    private ruteador:Router

  ){

    this.formularioEditoriales = this.formulario.group({
      ediNombre:['', [Validators.required, Validators.minLength(4)]],
      ediDireccion:['', [Validators.required]],
      ediTelefono: ['', [Validators.required,Validators.pattern(/^[0-9\s-]+$/), Validators.minLength(7), Validators.maxLength(20)]],
      ediEmail:['', [Validators.required, Validators.email]]
    });

  }


  ngOnInit(): void {
   
  }

  hasErrors(controlName: string, errorType: string) {
    return this.formularioEditoriales.get(controlName)?.hasError(errorType) && this.formularioEditoriales.get(controlName)?.touched;
    }


  enviarDatos():any{ 
    
    console.log(this.formularioEditoriales.value);
    
    this.servicioEditoriales.AgregarEditorial(this.formularioEditoriales.value).subscribe(()=>{
      this.alertEnvio = true;
      
      
      setTimeout(()=>{
        this.alertEnvio = false;
        this.alertCorrecto = true;
        this.alertCorrecto = false;
        this.alertCorrecto = true;
        
      },300)
      setTimeout(()=>{
        this.alertCorrecto = false;

        this.ruteador.navigateByUrl('/editoriales-listar');
      },900)

      
      
    });
    
  }


}