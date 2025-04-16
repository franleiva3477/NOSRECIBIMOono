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


const routes: Routes = [
  { path: '', redirectTo: '/dash', pathMatch: 'full' },  // Ruta por defecto
  { path: 'libros-listar', component: LibrosListarComponent },
  { path: 'libros-cargar', component: LibrosCargarComponent},
  { path: 'libros-editar/:id', component: LibrosEditarComponent},
  { path: 'dash', component: DashComponent },

  { path: 'autores-listar', component: AutoresListarComponent },
  { path: 'autores-cargar', component: AutoresCargarComponent},
  { path: 'autores-editar/:id', component: AutoresEditarComponent},

  { path: 'editoriales-listar', component: EditorialesListarComponent },
  { path: 'editoriales-cargar', component: EditorialesCargarComponent },
  { path: 'editoriales-editar/:id', component: EditorialesEditarComponent},


  { path: 'login', component: LoginComponent},






];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
