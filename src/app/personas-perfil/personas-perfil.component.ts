import { Component, OnInit } from '@angular/core';
import { PersonasService, Personas } from 'src/app/servicios/personas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personas-perfil',
  templateUrl: './personas-perfil.component.html',
  styleUrls: ['./personas-perfil.component.css']
})
export class PersonasPerfilComponent implements OnInit {

  usuario: Personas = {
    idPersona: 0,
    perNombre: '',
    perApellido: '',
    perDni: '',
    perContrasena: '',
    rolID: 0,
    rolNombre: ''
  };

  cargando = true;

  constructor(
    private personasService: PersonasService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.validarAcceso();     // valida que sea estudiante
    this.cargarPerfil();      // carga datos del usuario
  }

  validarAcceso() {
    const rol = localStorage.getItem('rol');

    if (rol !== 'estudiante') {
      // si NO es estudiante, lo sacamos del perfil
      this.router.navigate(['/dash-prof']);
    }
  }

  cargarPerfil() {
    const user = JSON.parse(localStorage.getItem('usuario')!);

    if (!user || !user.idPersona) {
      this.router.navigate(['/login']);
      return;
    }

    this.personasService.getPersona(user.idPersona).subscribe({
      next: (data) => {
        this.usuario = data;
        this.cargando = false;
      },
      error: () => {
        alert("Error cargando el perfil");
      }
    });
  }

  guardarCambios() {
    this.personasService.updatePersona(this.usuario).subscribe({
      next: () => {
        alert("Datos actualizados correctamente");
      },
      error: () => {
        alert("Error al guardar los cambios");
      }
    });
  }
}



  // editarPerfil() {
  //   this.router.navigate(['/personas-editar', this.estudiante.idPersona]);
  // }

  // cambiarPassword() {
  //   this.router.navigate(['/persona-password', this.estudiante.idPersona]);
  // }


