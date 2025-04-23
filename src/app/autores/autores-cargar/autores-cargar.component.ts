import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Autor, AutoresService } from 'src/app/servicios/autores.service';

@Component({
  selector: 'app-autores-cargar',
  templateUrl: './autores-cargar.component.html',
  styleUrls: ['./autores-cargar.component.css']
})
export class AutoresCargarComponent implements OnInit {

  autor: Autor = {
    autNombre: '',
    autApellido: '',
    autFechaNac: '', // ISO format 'YYYY-MM-DD'
    autBiografia: '',
    autFechaDes: ''
  };

  constructor(
    private autorservice: AutoresService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    console.log("Datos del formulario enviados:", this.autor);
    
    // Enviar los datos al backend
    this.autorservice.addAutor(this.autor).subscribe(
      (data) => {
        console.log('Autor creado con éxito', data);
        this.router.navigateByUrl('/autores-listar');
      }
    );
  }
}
