import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibrosListarComponent } from './libros/libros-listar/libros-listar.component';
import { DashComponent } from './dash/dash.component';
import { LibrosCargarComponent } from './libros/libros-cargar/libros-cargar.component';
import { LibrosEditarComponent } from './libros/libros-editar/libros-editar.component';

const routes: Routes = [
  { path: '', redirectTo: '/dash', pathMatch: 'full' },  // Ruta por defecto
  { path: 'libros-listar', component: LibrosListarComponent },
  { path: 'libros-cargar', component: LibrosCargarComponent},
  { path: 'libros-editar/:id', component: LibrosEditarComponent},
  { path: 'dash', component: DashComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
