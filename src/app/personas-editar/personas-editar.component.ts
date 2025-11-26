import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonasService } from 'src/app/servicios/personas.service';

@Component({
  selector: 'app-personas-editar',
  templateUrl: './personas-editar.component.html'
})
export class PersonasEditarComponent implements OnInit {
  id:any;

  persona: any = {
    idPersona: '',
    perNombre: '',
    perApellido: '',
    perContrasena: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private PersonasService: PersonasService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.PersonasService.getPersona(id!).subscribe(data => {
      this.persona = data;
    });
  }

  guardar() {
    this.PersonasService.updatePersona(this.persona).subscribe({
      next: () => {
        alert('Datos actualizados correctamente');
        this.router.navigate(['/dash-estudiantes']);
      },
      error: () => alert('Error al actualizar')
    });
  }
}
