import { Component, OnInit } from '@angular/core';
import {PersonasService,Personas,} from 'src/app/servicios/personas.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent {
  searchForm = new FormControl('');
   Personas: Personas[] = [];
    personasFiltradas: Personas[] = [];
    CantidadPersonas: number = 0;
      public page: number = 0;


    
  filtrarPersonas() {
    this.page = 0;
    const searchTerm = this.searchForm.value?.toLowerCase();
    if (!searchTerm) {
      this.personasFiltradas = this.Personas; // Si no hay término de búsqueda, muestra todas
    } else {
      this.personasFiltradas = this.Personas.filter(
        (personas) =>
          personas.perNombre
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) || // Filtra por nombre
          personas.perDni.toLowerCase().includes(searchTerm.toLowerCase()) // Puedes agregar más criterios de filtrado
      );
    }
  }
    }

