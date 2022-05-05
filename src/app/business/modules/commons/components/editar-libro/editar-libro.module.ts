import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditarLibroComponent } from './editar-libro.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule, InputModule } from 'src/app/commons/components';
import { HttpClientModule } from '@angular/common/http';
import { SelectModule } from 'src/app/commons/components/select/select.module';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [EditarLibroComponent],
  exports: [EditarLibroComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    InputModule,
    ButtonModule,
    SelectModule,
  ],
})
export class EditarLibroModule {}
