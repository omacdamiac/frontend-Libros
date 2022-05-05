import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from "rxjs/operators";
import { LoaderService } from 'src/app/commons/components/loader/commons/service/loader.service';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {

  constructor(
    private loaderService: LoaderService,
    private authService: AuthService,
    private toastr: ToastrService,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // return next.handle(request);
    const token: string = this.authService.getToken()
    // const token: string = sessionStorage.getItem('token')
    if(token) {
      request = request.clone({
        setHeaders: {
          authorization: `Bearer ${ token }`
        }
      })
    }
    this.loaderService.showLoader()
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        
        let errorMsg = ''
        if(error.error instanceof ErrorEvent) {
          errorMsg = `Error: ${error.message}`
          this.toastr.info('', errorMsg);
          console.log(errorMsg)
        } else {
          errorMsg = `Error Code: ${error.error.status},  Message: ${error.message}`
          this.toastr.warning('', errorMsg);
        }
        return throwError(errorMsg)
      }),
      finalize(() => this.loaderService.closeLoader())
    )
  }
}
