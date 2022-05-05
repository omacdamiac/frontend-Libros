import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ButtonNsModel } from 'src/app/commons/components/button/model/button-ns.model';
import { InputNsModel } from 'src/app/commons/components/input/model/input-ns.model';
import { DataPresenterService } from '../../services/data-presenter.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Book } from 'src/app/core/models/book.model';
import { BooksService } from 'src/app/core/services/books/books.service';
import { SelectNsModel } from 'src/app/commons/components/select/model/select-ns.model';
import { MatDialog } from '@angular/material/dialog';
import { AutorComponent } from '../autor/autor.component';

@Component({
  selector: 'app-crear-libro',
  templateUrl: './crear-libro.component.html',
  styleUrls: ['./crear-libro.component.scss'],
})
export class CrearLibroComponent implements OnInit {
  formNewBook: FormGroup;
  title: string;
  inputTitulo = new InputNsModel.InputClass(
    'Título',
    'Ingrese título de libro',
    true,
    'titulo',
    'text'
  );
  inputDescription = new InputNsModel.InputClass(
    'Descripción',
    'Ingresar descripción',
    true,
    'descripcion',
    'textarea',
    false,
    '5'
  );
  inputAutor = new InputNsModel.InputClass(
    'Autor',
    'Nombre del autor',
    true,
    'autor',
    'text',
    true
  );
  selectAnio = new SelectNsModel.SelectClass('Año', 'anio', true);
  chk: any;
  buttonSave = new ButtonNsModel.ButtonClass(
    'Guardar libro',
    'primary',
    'bordee'
  );
  buttonCancel = new ButtonNsModel.ButtonClass('<', 'accent', 'borde');
  buttonAutor = new ButtonNsModel.ButtonClass('Nuevo autor', 'primary', '');
  name: string;
  gender: string;
  autor: any;
  constructor(
    private dataPresenterService: DataPresenterService,
    private toastr: ToastrService,
    private router: Router,
    private booksService: BooksService,
    public dialog: MatDialog
  ) {
    this.title = this.dataPresenterService.crearTitle;
    this.chk = { checked: false, color: 'primary', name: 'publicado' };
    this.selectAnio.options = this.dataPresenterService.anios;
  }

  ngOnInit(): void {
    this.createFormBook();
    this.formNewBook.addControl('publicado', new FormControl(false));
  }
  private createFormBook() {
    this.formNewBook = new FormGroup({});
  }
  public setAutor(): void {
    const dialogRef = this.dialog.open(AutorComponent, {
      disableClose: true,
      width: '50%',
      data: this.autor,
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.autor = result.value;
      this.formNewBook.removeControl('autor');
      this.formNewBook.addControl('autor', new FormControl(this.autor));
    });
  }
  public saveBook() {
    let data = this.formNewBook.value;
    if (this.formNewBook.valid) {
      let payload = this.objRequest(data);
      this.booksService.createBook(payload).subscribe({
        next: (_) => {
          this.toastr.success('', 'Libro creado!');
          this.router.navigate(['libros']);
        },
        complete: () => console.log('Creado'),
      });
    } else {
      this.toastr.warning('', 'Completar todos los campos!');
    }
  }
  public chkSet(e: any) {
    this.formNewBook.controls.publicado.setValue(e);
  }
  public btnCancel() {
    Swal.fire({
      title: '¿Desea salir de la página?',
      text: 'Se perderan los datos a registrar',
      showCancelButton: true,
      confirmButtonText: 'salir',
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['libros']);
      }
    });
  }
  private objRequest(form: Book) {
    return {
      anio: Number(form.anio),
      descripcion: form.descripcion,
      publicado: form.publicado,
      titulo: form.titulo,
      autor: form.autor,
    };
  }
}
