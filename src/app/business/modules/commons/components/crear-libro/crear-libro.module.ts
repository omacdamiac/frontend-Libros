import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrearLibroComponent } from './crear-libro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ButtonModule, InputModule } from 'src/app/commons/components';
import { MaterialModule } from 'src/app/material/material.module';
import { DataPresenterService } from '../../services/data-presenter.service';
import { EditarLibroModule } from '../editar-libro/editar-libro.module';
import { SelectModule } from 'src/app/commons/components/select/select.module';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [CrearLibroComponent],
  exports: [CrearLibroComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    EditarLibroModule,
    InputModule,
    ButtonModule,
    SelectModule,
  ],
  providers: [DataPresenterService],
})
export class CrearLibroModule {}
