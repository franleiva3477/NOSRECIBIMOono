import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Autor, AutoresService } from 'src/app/servicios/autores.service';


@Component({
  selector: 'app-autores-listar',
  templateUrl: './autores-listar.component.html',
  styleUrls: ['./autores-listar.component.css']
})
export class AutoresListarComponent {
  
  autores: any[] = [];

  constructor(private autoresService : AutoresService, 
    private router: Router  ){};

  ngOnInit(){this.LoadAutores();}

  LoadAutores(): void {
    this.autoresService.getAutor().subscribe(
      (data: Autor[] )=> {
          this.autores = data;
      }
    );
  }

  deleteAutor(id: number): void {
    
      this.autoresService.delAutor(id).subscribe(() => {
        this.LoadAutores();
      }, (error) => {
        console.error('Error al eliminar autor:', error);
      });
   
  }
 
  editAutor(id: number): void {
    this.router.navigate(['/biblioteca/autores-editar/',id]);
  }
  navigateToCreate(){
    
    this.router.navigateByUrl('/biblioteca/autores-cargar');
    
  }
 
  
}