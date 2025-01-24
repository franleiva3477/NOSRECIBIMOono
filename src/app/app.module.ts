import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LibrosListarComponent } from './libros/libros-listar/libros-listar.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DashComponent } from './dash/dash.component';
import { LibrosCargarComponent } from './libros/libros-cargar/libros-cargar.component';
import { LibrosEditarComponent } from './libros/libros-editar/libros-editar.component';
import { AutoresListarComponent } from './autores/autores-listar/autores-listar.component';
import { AutoresCargarComponent } from './autores/autores-cargar/autores-cargar.component';
import { AutoresEditarComponent } from './autores/autores-editar/autores-editar.component';
import { EncabezadoComponent } from './encabezado/encabezado.component';

@NgModule({
  declarations: [
    AppComponent,
    LibrosListarComponent,
    DashComponent,
    LibrosCargarComponent,
    LibrosEditarComponent,
    AutoresListarComponent,
    AutoresCargarComponent,
    AutoresEditarComponent,
    EncabezadoComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
