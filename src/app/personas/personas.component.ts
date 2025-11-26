import { Component, OnInit } from '@angular/core';
import { PersonasService, Personas } from 'src/app/servicios/personas.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent implements OnInit {

  searchForm = new FormControl('');
  Personas: Personas[] = [];
  personasFiltradas: Personas[] = [];
  CantidadPersonas: number = 0;
  public page: number = 0;

  constructor(private personasService: PersonasService, private router: Router) {}

  ngOnInit(): void {
    this.cargarPersonas();
  }

  cargarPersonas() {
  this.personasService.getPersonas().subscribe((data: Personas[]) => {
    this.Personas = data.filter(p => p.rolID === 1);
    this.personasFiltradas = this.Personas;
  });
}


  filtrarPersonas() {
    this.page = 0;
    const searchTerm = this.searchForm.value?.toLowerCase();
    if (!searchTerm) {
      this.personasFiltradas = this.Personas;
    } else {
      this.personasFiltradas = this.Personas.filter(
        (p) =>
          p.perNombre.toLowerCase().includes(searchTerm) ||
          p.perDni.toLowerCase().includes(searchTerm)
      );
    }
  }
}
