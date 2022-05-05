import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ButtonNsModel } from 'src/app/commons/components/button/model/button-ns.model';
import { InputNsModel } from 'src/app/commons/components/input/model/input-ns.model';

@Component({
  selector: 'app-autor',
  templateUrl: './autor.component.html',
  styleUrls: ['./autor.component.scss'],
})
export class AutorComponent implements OnInit {
  title: string;
  formAutor: FormGroup;
  inputNombreAutor = new InputNsModel.InputClass(
    'Nombre',
    'Ingrese nombre del autor',
    true,
    'nombre',
    'text'
  );
  inputGenero = new InputNsModel.InputClass(
    'Género',
    'Ingrese género del libro',
    true,
    'genero',
    'text'
  );
  buttonSaveAutor = new ButtonNsModel.ButtonClass(
    'Guardar autor',
    'primary',
    'bordee'
  );
  autor: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.title = 'Nuevo autor';
    this.autor = data;
  }

  ngOnInit(): void {
    this.formAutor = new FormGroup({});
    if (this.autor?.id !== undefined) {
      this.formAutor.addControl('id', new FormControl(this.autor.id));
    }
  }
  public saveAutor() {
    console.log(this.formAutor.value);
  }
}
