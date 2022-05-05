import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputModule } from 'src/app/commons/components/input/input.module';
import { ButtonModule } from 'src/app/commons/components/button/button.module';
import { RouterModule } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { sanitizeHtmlPipe } from 'src/app/core/pipes/html-sanitizer.pipe';

@NgModule({
  declarations: [AuthComponent, sanitizeHtmlPipe],
  exports: [AuthComponent, sanitizeHtmlPipe],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    InputModule,
    ButtonModule,
  ],
  providers: [AuthService],
})
export class AuthModule {}
