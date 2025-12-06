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
import { EditorialesListarComponent } from './editoriales/editoriales-listar/editoriales-listar.component';
import { EditorialesEditarComponent } from './editoriales/editoriales-editar/editoriales-editar.component';
import { EditorialesCargarComponent } from './editoriales/editoriales-cargar/editoriales-cargar.component';
import { LoginComponent } from './login/login.component';
import { DashProfComponent } from './dash/dash-prof/dash-prof.component';
import { DashEstudiantesComponent } from './dash/dash-estudiantes/dash-estudiantes.component';
import { PersonasComponent } from './personas/personas.component';
import { RegistroComponent } from './registro/registro.component';
import { PrestamosLibrosComponent } from './prestamos-libros/prestamos-libros.component';
import { PersonasEditarComponent } from './personas-editar/personas-editar.component';
import { PersonasPerfilComponent } from './personas-perfil/personas-perfil.component';
import { PublicLayoutComponent } from './layouts/public-layout/public-layout.component';
import { PrivateLayoutComponent } from './layouts/private-layout/private-layout.component';

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
    EncabezadoComponent,
    EditorialesListarComponent,
    EditorialesEditarComponent,
    EditorialesCargarComponent,
    LoginComponent,
    DashProfComponent,
    DashEstudiantesComponent,
    PersonasComponent,
    RegistroComponent,
    PrestamosLibrosComponent,
    PersonasEditarComponent,
    PersonasPerfilComponent,
    PublicLayoutComponent,
    PrivateLayoutComponent
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
