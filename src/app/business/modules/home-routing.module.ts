import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { AutoresComponent } from './commons/components/autores/autores.component';
import { CrearLibroComponent } from './commons/components/crear-libro/crear-libro.component';
import { DashboardComponent } from './commons/components/dashboard/dashboard.component';
import { LibrosComponent } from './commons/components/libros/libros.component';

const routes: Routes = [
  { path: 'libros', component: LibrosComponent, canActivate: [AuthGuard] },
  {
    path: 'crear-libro',
    component: CrearLibroComponent,
    canActivate: [AuthGuard],
  },
  { path: 'autores', component: AutoresComponent, canActivate: [AuthGuard] },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
