import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PersonasService } from 'src/app/servicios/personas.service';
import { RolesService } from 'src/app/servicios/roles.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  mostrarPass = false;
  formularioRegistro: FormGroup;
  roles: any = [];

  constructor(
    private fb: FormBuilder,
    private personasService: PersonasService,
    private rolesService: RolesService,
    private router: Router
  ) {
    this.formularioRegistro = this.fb.group({
      perNombre: ['', Validators.required],
      perApellido: ['', Validators.required],
      perDni: ['', Validators.required],
      perContrasena: ['', Validators.required],
      rolID: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.rolesService.getRoles().subscribe(respuesta => {
      this.roles = respuesta;
    });
  }

  registrarPersona() {
    this.personasService.registrarPersona(this.formularioRegistro.value).subscribe(
      respuesta => {  
       alert("Registro exitoso!");
        console.log("Persona registrada:", respuesta);//por las dudas 
        this.router.navigateByUrl('/login');
      }
    );
  }
}
