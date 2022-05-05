import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { END_POINTS } from 'src/app/commons/const/constUris';
import { DATA_PRESENTER } from 'src/app/commons/const/mock';
import { UTILS } from 'src/app/commons/utils/utils';
import { environment } from 'src/environments/environment';
import { Login } from '../../models/login.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(user: Login): Observable<any> {
    let url_api = `${environment.api_login}${END_POINTS.LOGIN}`;
    return this.http
      .post<any>(url_api, user)
      .pipe(switchMap((e) => this.setAuth(e, user)));
  }

  private setAuth(res: any, userInfo: Login) {
    // const userData = this.obtenerToken(res.token)
    const userData = res.token;
    const logueoDate = new Date();
    const rol = DATA_PRESENTER.USER_ROL;
    const name = DATA_PRESENTER.USER_NAME;

    UTILS.setStorageUsername(userInfo);
    UTILS.setStorageName(name);
    UTILS.setStorageLogueoDate(logueoDate);
    UTILS.setStorageRol(rol);
    UTILS.setStorageTOKEN(userData);
    return userData;
  }

  getToken() {
    return UTILS.getSessionToken();
  }
}
