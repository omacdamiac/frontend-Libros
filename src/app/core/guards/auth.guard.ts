import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UTILS } from 'src/app/commons/utils/utils';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate() {
    let session = UTILS.getSessionToken();
    if (session === null) {
      console.log('No esta logueado');
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
