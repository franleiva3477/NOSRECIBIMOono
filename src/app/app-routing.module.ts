import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibrosListarComponent } from './libros/libros-listar/libros-listar.component';
import { DashComponent } from './dash/dash.component';


const routes: Routes = [
  { path: 'libros-listar', component: LibrosListarComponent },
  { path: 'dash', component: DashComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
  
 }
