import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibrosComponent } from './libros.component';
import { MaterialModule } from 'src/app/material/material.module';
import { ButtonModule, InputModule } from 'src/app/commons/components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BooksService } from 'src/app/core/services';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [LibrosComponent],
  imports: [CommonModule, MaterialModule, ButtonModule],
  exports: [LibrosComponent],
  providers: [BooksService],
})
export class LibrosModule {}
