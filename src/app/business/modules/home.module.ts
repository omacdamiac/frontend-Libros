import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { LibrosModule } from './commons/components/libros/libros.module';
import { AutoresModule } from './commons/components/autores/autores.module';
import { DashboardModule } from './commons/components/dashboard/dashboard.module';
import { AuthService } from 'src/app/core/services';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CrearLibroModule } from './commons/components/crear-libro/crear-libro.module';
import { AutorModule } from './commons/components/autor/autor.module';
import { InterceptorInterceptor } from 'src/app/core/interceptors/interceptor.interceptor';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    AutorModule,
    LibrosModule,
    AutoresModule,
    DashboardModule,
    CrearLibroModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorInterceptor,
      multi: true,
    },AuthService],
})
export class HomeModule {}
