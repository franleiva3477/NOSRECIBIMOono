import { Component, OnInit } from '@angular/core';
import {
  EditorialesService,
  Editorial,
} from 'src/app/servicios/editoriales.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editorial-listar',
  templateUrl: './editoriales-listar.component.html',
  styleUrls: ['./editoriales-listar.component.css'],
})
export class EditorialesListarComponent implements OnInit {
  searchForm = new FormControl('');
  Editoriales: Editorial[] = [];
  editorialesFiltradas: Editorial[] = [];
  CantidadEditoriales: number = 0;

  public page: number = 0;

  constructor(private servicioEditoriales: EditorialesService,private ruteador:Router) {}

  ngOnInit(): void {
    this.cargarEditoriales();
    this.searchForm.valueChanges.subscribe((value) => {
      this.filtrarEditoriales(); // Llama a filtrarEditoriales cada vez que cambia el valor
    });
  }

  cargarEditoriales() {
    this.servicioEditoriales.ObtenerEditoriales().subscribe((respuesta) => {
      console.log(respuesta);
      this.Editoriales = respuesta;
      this.editorialesFiltradas = respuesta; // Inicializa las editoriales filtradas
    });
  }

  filtrarEditoriales() {
    this.page = 0;
    const searchTerm = this.searchForm.value?.toLowerCase();
    if (!searchTerm) {
      this.editorialesFiltradas = this.Editoriales; // Si no hay término de búsqueda, muestra todas
    } else {
      this.editorialesFiltradas = this.Editoriales.filter(
        (editorial) =>
          editorial.ediNombre
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) || // Filtra por nombre
          editorial.ediEmail.toLowerCase().includes(searchTerm.toLowerCase()) // Puedes agregar más criterios de filtrado
      );
    }
  }

  borrarEditorial(id: any, iControl: any) {
    console.log(id);
    console.log(iControl);
    
    if (window.confirm("¿Desea borrar el registro?")) {
      this.servicioEditoriales.BorrarEditorial(id).subscribe((respuesta) => {
        this.Editoriales.splice(iControl, 1); // Elimina la editorial del array
        this.cargarEditoriales(); // Actualiza la lista filtrada
        
        
      });
    }
    this.ruteador.navigateByUrl('/editoriales-listar');
    this.page = 0;
  }


  nextPage(){
      this.page += 5; 
  }
  prevPage(){
    if(this.page > 0){
      this.page -= 5;
    }
  }
  
}