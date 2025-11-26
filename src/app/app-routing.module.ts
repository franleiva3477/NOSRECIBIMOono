import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibrosListarComponent } from './libros/libros-listar/libros-listar.component';
import { DashComponent } from './dash/dash.component';
import { LibrosCargarComponent } from './libros/libros-cargar/libros-cargar.component';
import { LibrosEditarComponent } from './libros/libros-editar/libros-editar.component';
import { AutoresEditarComponent } from './autores/autores-editar/autores-editar.component';
import { AutoresListarComponent } from './autores/autores-listar/autores-listar.component';
import { AutoresCargarComponent } from './autores/autores-cargar/autores-cargar.component';
import { EditorialesListarComponent } from './editoriales/editoriales-listar/editoriales-listar.component';
import { EditorialesCargarComponent } from './editoriales/editoriales-cargar/editoriales-cargar.component';
import { EditorialesEditarComponent } from './editoriales/editoriales-editar/editoriales-editar.component';
import { LoginComponent } from './login/login.component';
import { DashProfComponent } from './dash/dash-prof/dash-prof.component';
import { DashEstudiantesComponent } from './dash/dash-estudiantes/dash-estudiantes.component';
import { PersonasComponent } from './personas/personas.component';
import { PersonasEditarComponent } from './personas-editar/personas-editar.component';
import { RegistroComponent } from './registro/registro.component';
import { EncabezadoComponent } from './encabezado/encabezado.component';
import { AuthGuard } from './guards/auth.guard';
import { PrestamosLibrosComponent } from './prestamos-libros/prestamos-libros.component';
import { PersonasPerfilComponent } from './personas-perfil/personas-perfil.component';






const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' }, 
  { path: 'libros-listar', component: LibrosListarComponent },
  { path: 'libros-listar', component: LibrosListarComponent },
  { path: 'libros-cargar', component: LibrosCargarComponent},
  { path: 'encabezado', component: EncabezadoComponent},

  { path: 'dash', component: DashComponent },
    { path: 'dash-prof', component: DashProfComponent, canActivate: [AuthGuard], data: { rol: 'bibliotecario' } },
  { path: 'dash-estudiantes', component: DashEstudiantesComponent, canActivate: [AuthGuard], data: { rol: 'estudiante' } },

  { path: 'autores-listar', component: AutoresListarComponent },
  { path: 'autores-cargar', component: AutoresCargarComponent},
  { path: 'autores-editar/:id', component: AutoresEditarComponent},

  { path: 'editoriales-listar', component: EditorialesListarComponent },
  { path: 'editoriales-cargar', component: EditorialesCargarComponent },
  { path: 'editoriales-editar/:id', component: EditorialesEditarComponent},


  { path: 'login', component: LoginComponent},
  {path: 'personas', component:PersonasComponent},
  { path: 'personas-editar/:id', component: PersonasEditarComponent, canActivate: [AuthGuard] },
  {
  path: 'perfil',component: PersonasPerfilComponent,canActivate: [AuthGuard],data: { rol: 'estudiante' } },

  {path: 'registro', component:RegistroComponent},

  {path: 'prestamos', component:PrestamosLibrosComponent},





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
