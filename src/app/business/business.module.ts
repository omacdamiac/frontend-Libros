import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusinessRoutingModule } from './business-routing.module';
import { BusinessComponent } from './business.component';
import { HomeModule } from './modules/home.module';
import { HeaderModule } from '../commons/components/header/header.module';
import { SidebarModule } from '../commons/components/sidebar/sidebar.module';
import { BooksService } from '../core/services/books/books.service';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { LoaderModule } from '../commons/components/loader/loader.module';
import { AuthService } from '../core/services';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [BusinessComponent],
  imports: [
    CommonModule,
    BusinessRoutingModule,
    MaterialModule,
    HomeModule,
    HeaderModule,
    SidebarModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    LoaderModule,
  ],
  exports: [BusinessComponent],
  providers: [

    BooksService,
    AuthService,
  ],
})
export class BusinessModule {}
