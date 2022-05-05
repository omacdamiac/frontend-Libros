import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ButtonNsModel } from 'src/app/commons/components/button/model/button-ns.model';
import { Book } from 'src/app/core/models/book.model';
import { BooksService } from 'src/app/core/services/books/books.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { EditarLibroComponent } from '../editar-libro/editar-libro.component';
import Swal from 'sweetalert2';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.scss'],
})
export class LibrosComponent implements OnInit {
  table: boolean;
  title: string;
  displayedColumns: string[] = [
    'id',
    'titulo',
    'descripcion',
    'autor',
    'anio',
    'publicado',
    'opciones',
  ];
  dataSource!: MatTableDataSource<Book>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  buttonNew = new ButtonNsModel.ButtonClass('Crear libro', 'primary', 'borde');

  constructor(
    private router: Router,
    public booksService: BooksService,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) {
    this.table = false;
    this.title = 'Módulo libros';
  }
  ngOnInit(): void {
    this.getListLibros();
  }
  private getListLibros(): void {
    this.booksService
      .getListBooks()
      .subscribe({
        next: (response: Book[]) => {
          this.dataSource = new MatTableDataSource(response);
          this.table = true;
          setTimeout(() => {
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;                
          }, 0);
        },
        error: (err) => console.log(err),
        complete: () => console.log('Libros listados'),
      });
  }
  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  public create() {
    this.router.navigate(['crear-libro']);
  }
  public edit(row: Book) {
    const dialogRef = this.dialog.open(EditarLibroComponent, {
      disableClose: true,
      width: '100%',
      data: row,
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getListLibros();
    });
  }
  public delete(row: Book) {
    let idLibro = row.id;
    Swal.fire({
      title: '¿Desea eliminar el libro?',
      text: row.titulo,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteBook(row);
      }
    });
  }
  private deleteBook(e: Book) {
    return this.booksService
      .deleteBook(e.id)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.toastr.info('', `Se elimino libro ${e.titulo} !`);
          this.getListLibros();
        },
        complete: () => console.log('Libro Eliminado'),
      });
  }
}
