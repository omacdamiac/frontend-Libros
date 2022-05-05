import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard.component';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, MaterialModule],
  exports: [DashboardComponent],
})
export class DashboardModule {}
