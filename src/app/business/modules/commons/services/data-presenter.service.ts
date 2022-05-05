import { Injectable } from '@angular/core';
import { DATAMOCK } from 'src/app/core/models/data-presenter';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DataPresenterService {
  title: string;
  main: DATAMOCK.Main[] = [];
  login: DATAMOCK.Login[] = [];
  crearTitle: string;
  anios: string[];
  notImage: string;

  constructor() {
    this.notImage = `${environment.url_notImage}`;
    this.title = 'Módulo libros';
    this.main = [
      { id: 0, text: 'Dashboard', link: 'dashboard' },
      { id: 1, text: 'Autores', link: 'autores' },
      { id: 2, text: 'Libros', link: 'libros' },
    ];
    /** LOGIN */
    this.login = [
      {
        title: 'Login',
        subtitle:
          'Ingrese datos para autenticarse.<br>[ <strong>Usuario:</strong> eve.holt@reqres.in ]<br>[ <strong>Clave:</strong> Ingrese cualquier tecla ]',
      },
    ];
    /** LIBROS */
    this.crearTitle = 'Crear nuevo libro';
    this.anios = ['2019', '2020', '2021', '2022'];
  }
}
