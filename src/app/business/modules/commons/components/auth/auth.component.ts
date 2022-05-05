import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { InputNsModel } from 'src/app/commons/components/input/model/input-ns.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ButtonNsModel } from 'src/app/commons/components/button/model/button-ns.model';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { DataPresenterService } from '../../services/data-presenter.service';
import { Login } from 'src/app/core/models/login.model';
import { UTILS } from 'src/app/commons/utils/utils';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  title: string;
  subtitle: string;
  form!: FormGroup;

  inputUser = new InputNsModel.InputClass(
    'Usuario',
    'Ingresa tu usuario',
    true,
    'user',
    'text'
  );
  inputPass = new InputNsModel.InputClass(
    'Clave',
    'Ingresa tu clave',
    true,
    'pass',
    'password'
  );
  buttonLogin = new ButtonNsModel.ButtonClass('INGRESAR', 'primary', 'bordee');

  constructor(
    private toastr: ToastrService,
    public router: Router,
    private authService: AuthService,
    private dataPresenterService: DataPresenterService
  ) {
    this.title = this.dataPresenterService.login[0].title;
    this.subtitle = this.dataPresenterService.login[0].subtitle;
  }

  ngOnInit(): void {
    this.createForm();
    this.logout();
  }
  private createForm() {
    this.form = new FormGroup({});
  }
  public keySend(btn: any) {
    let key = btn.keyCode
    if(key === 13) {
      this.isLogin()
    }
  }
  public isLogin() {    
    let data = this.form.value;
    let payload: Login = {
      email: data.user.trim(),
      password: data.pass,
    };
    if (this.form.valid) {
      this.toastr.info('', 'Validando usuario!');
      this.authService
        .login(payload)
        .pipe(take(1))
        .subscribe({
          next: (response: string) => {
            this.router.navigateByUrl('libros');
          },
          complete: () => console.log('Autenticado'),
        });
    } else {
      this.toastr.error('', 'Formulario invalido!');
    }
  }
  private logout() {
    UTILS.logout();
    this.router.navigate(['/']);
  }
}
