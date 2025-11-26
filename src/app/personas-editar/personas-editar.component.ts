import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonasService, Personas } from 'src/app/servicios/personas.service';

@Component({
  selector: 'app-personas-editar',
  templateUrl: './personas-editar.component.html'
})
export class PersonasEditarComponent implements OnInit {

  persona: Personas = {
    idPersona: 0,
    perNombre: '',
    perApellido: '',
    perDni: '',
    perContrasena: '',
    rolID: 1
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private personasService: PersonasService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      alert("ID no válido");
      this.router.navigate(['/dash-estudiantes']);
      return;
    }

    //this.personasService.getPersona(id).subscribe({
    //  next: data => {
      //  this.persona = data;
     // },
      error: () => {
        alert("Error cargando el usuario");
      }
  //  });
  }

  guardar() {
    this.personasService.updatePersona(this.persona).subscribe({
      next: () => {
        alert('Datos actualizados correctamente');
        this.router.navigate(['/dash-estudiantes']);
      },
      error: () => {
        alert('Error al actualizar');
      }
    });
  }
}
