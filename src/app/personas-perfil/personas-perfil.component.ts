import { Component, OnInit } from '@angular/core';
import { PersonasService, Personas } from 'src/app/servicios/personas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personas-perfil',
  templateUrl: './personas-perfil.component.html',
  styleUrls: ['./personas-perfil.component.css']
})
export class PersonasPerfilComponent implements OnInit {

  estudiante!: Personas;
  dniUsuario: string | null = null;

  constructor(
    private personasService: PersonasService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dniUsuario = localStorage.getItem('dni'); // Se guarda en el login

    if (!this.dniUsuario) {
      console.error("DNI no encontrado en localStorage");
      return;
    }

    this.cargarDatosEstudiante();
  }

  cargarDatosEstudiante() {
    this.personasService.getPersonas().subscribe((data: Personas[]) => {

      const usuario = data.find(p => p.perDni === this.dniUsuario);

      if (usuario) {
        this.estudiante = usuario;
      } else {
        console.error("No se encontró el estudiante");
      }

    });
  }

  // editarPerfil() {
  //   this.router.navigate(['/personas-editar', this.estudiante.idPersona]);
  // }

  // cambiarPassword() {
  //   this.router.navigate(['/persona-password', this.estudiante.idPersona]);
  // }

}
