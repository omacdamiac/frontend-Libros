import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ButtonNsModel } from 'src/app/commons/components/button/model/button-ns.model';
import { InputNsModel } from 'src/app/commons/components/input/model/input-ns.model';
import { Book } from 'src/app/core/models/book.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { BooksService } from 'src/app/core/services/books/books.service';
import { SelectNsModel } from 'src/app/commons/components/select/model/select-ns.model';
import { DataPresenterService } from '../../services/data-presenter.service';
import { AutorComponent } from '../autor/autor.component';

@Component({
  selector: 'app-editar-libro',
  templateUrl: './editar-libro.component.html',
  styleUrls: ['./editar-libro.component.scss'],
})
export class EditarLibroComponent implements OnInit {
  formEditBook: FormGroup;
  book: Book;
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
    ''
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
  chk;
  buttonSave = new ButtonNsModel.ButtonClass(
    'Guardar libro',
    'primary',
    'bordee'
  );
  buttonCancel = new ButtonNsModel.ButtonClass('<', 'accent', 'borde');
  buttonAutor = new ButtonNsModel.ButtonClass('Nuevo autor', 'primary', '');
  autor: any;

  constructor(
    private toastr: ToastrService,
    private router: Router,
    public dialog: MatDialog,
    private booksService: BooksService,
    private dataPresenterService: DataPresenterService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.book = data;
    this.chk = { checked: false, color: 'primary', name: 'publicado' };
    this.selectAnio.options = this.dataPresenterService.anios;
    this.selectAnio.value = String(this.book.anio);
  }

  ngOnInit(): void {
    this.createFormEdit();
    this.formEditBook.addControl('publicado', new FormControl(false));
    this.formEditBook.addControl('id', new FormControl(this.book.id));
  }
  createFormEdit() {
    this.formEditBook = new FormGroup({});
  }
  public setAutor() {
    const dialogRef = this.dialog.open(AutorComponent, {
      disableClose: true,
      width: '50%',
      data: this.book.autor,
    });
    dialogRef.afterClosed().subscribe((result) => {
      // this.getListLibros()
      this.autor = result.value;
      this.book.autor = this.autor;

      this.formEditBook.removeControl('autor');
      this.formEditBook.addControl('autor', new FormControl(this.autor));
    });
  }
  public updateBook() {
    let data = this.formEditBook.value;
    if (this.formEditBook.valid) {
      let payload = this.objRequest(data);
      this.booksService.editBook(payload).subscribe({
        next: (_) => {
          this.toastr.success('', 'Libro Modificado!');
          this.dialog.closeAll();
        },
        complete: () => console.log('SE ha modificado el Libro'),
      });
    } else {
      this.toastr.warning('', 'Completar todos los campos!');
    }
  }
  public chkSet(e: any) {
    this.formEditBook.controls.publicado.setValue(e);
  }
  private objRequest(form: Book) {
    return {
      anio: Number(form.anio),
      id: form.id,
      descripcion: form.descripcion,
      publicado: form.publicado,
      titulo: form.titulo,
      autor: this.autor === undefined ? this.book.autor : this.autor,
    };
  }
}
