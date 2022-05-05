import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutoresComponent } from './autores.component';
import { MaterialModule } from 'src/app/material/material.module';
import { BooksService } from 'src/app/core/services';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [AutoresComponent],
  imports: [CommonModule, MaterialModule],
  exports: [AutoresComponent],
  providers: [BooksService],
})
export class AutoresModule {}
