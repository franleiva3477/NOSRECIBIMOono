import { Component } from '@angular/core';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent {
  isMenuOpen = false;

  constructor(){

  }

  ngOnInit() { }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

}
