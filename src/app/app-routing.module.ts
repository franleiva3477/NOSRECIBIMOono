import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PublicLayoutComponent } from './layouts/public-layout/public-layout.component';
import { PrivateLayoutComponent } from './layouts/private-layout/private-layout.component';

import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';

import { DashProfComponent } from './dash/dash-prof/dash-prof.component';
import { DashEstudiantesComponent } from './dash/dash-estudiantes/dash-estudiantes.component';

import { LibrosListarComponent } from './libros/libros-listar/libros-listar.component';
import { LibrosCargarComponent } from './libros/libros-cargar/libros-cargar.component';
import { LibrosEditarComponent } from './libros/libros-editar/libros-editar.component';

import { EditorialesListarComponent } from './editoriales/editoriales-listar/editoriales-listar.component';
import { EditorialesCargarComponent } from './editoriales/editoriales-cargar/editoriales-cargar.component';
import { EditorialesEditarComponent } from './editoriales/editoriales-editar/editoriales-editar.component';

import { AutoresListarComponent } from './autores/autores-listar/autores-listar.component';
import { AutoresCargarComponent } from './autores/autores-cargar/autores-cargar.component';
import { AutoresEditarComponent } from './autores/autores-editar/autores-editar.component';

import { PersonasComponent } from './personas/personas.component';
import { PersonasEditarComponent } from './personas-editar/personas-editar.component';
import { PersonasPerfilComponent } from './personas-perfil/personas-perfil.component';

import { PrestamosLibrosComponent } from './prestamos-libros/prestamos-libros.component';

import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [

  // 🌐 PÚBLICO (sin sesión)
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'registro', component: RegistroComponent }
    ]
  },

  // 🔐 PRIVADO — requiere sesión
  {
    path: '',
    component: PrivateLayoutComponent,
    canActivate: [AuthGuard],
    children: [

      // DASHBOARDS
      { path: 'dash-prof', component: DashProfComponent, data: { rol: 'bibliotecario' } },
      { path: 'dash-estudiantes', component: DashEstudiantesComponent, data: { rol: 'estudiante' } },

      // LIBROS
      { path: 'libros-listar', component: LibrosListarComponent },
      { path: 'libros-cargar', component: LibrosCargarComponent, data: { rol: 'bibliotecario' } },
      { path: 'libros-editar/:id', component: LibrosEditarComponent, data: { rol: 'bibliotecario' } },

      // AUTORES
      { path: 'autores-listar', component: AutoresListarComponent },
      { path: 'autores-cargar', component: AutoresCargarComponent },
      { path: 'autores-editar/:id', component: AutoresEditarComponent },

      // EDITORIALES
      { path: 'editoriales-listar', component: EditorialesListarComponent, data: { rol: 'bibliotecario' }},
      { path: 'editoriales-cargar', component: EditorialesCargarComponent, data: { rol: 'bibliotecario' }},
      { path: 'editoriales-editar/:id', component: EditorialesEditarComponent, data: { rol: 'bibliotecario' }},

      // PERSONAS
      { path: 'personas', component: PersonasComponent, data: { rol: 'bibliotecario' }},
      { path: 'personas-editar/:id', component: PersonasEditarComponent, data: { rol: 'bibliotecario' }},
      { path: 'perfil', component: PersonasPerfilComponent, data: { rol: 'estudiante' }},

      // PRESTAMOS
      { path: 'prestamos', component: PrestamosLibrosComponent },
    ]
  },

  // ERROR 404 (opcional)
  { path: '**', redirectTo: 'login' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
