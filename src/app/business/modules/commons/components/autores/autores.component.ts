import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { take } from 'rxjs/operators';
import { Autor, Book } from 'src/app/core/models/book.model';
import { BooksService } from 'src/app/core/services/books/books.service';

@Component({
  selector: 'app-autores',
  templateUrl: './autores.component.html',
  styleUrls: ['./autores.component.scss'],
})
export class AutoresComponent implements OnInit {
  table: boolean;
  title: string;
  displayedColumns: string[] = ['id', 'autor', 'genero'];
  dataSource!: MatTableDataSource<Autor>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private booksService: BooksService) {
    this.table = false;
    this.title = 'Módulo autores / género';
  }

  ngOnInit(): void {
    this.getListAutores();
  }
  private getListAutores(): void {
    this.booksService
      .getListBooks()
      .pipe(take(1))
      .subscribe({
        next: (res: Book[]) => {
          let response = res.map((autor: any) => {
            return autor.autor;
          });
          this.dataSource = new MatTableDataSource(response);
          this.table = true;
          setTimeout(() => {
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;                
          }, 0);        },
        error: (err) => console.log(err),
        complete: () => console.log('Autores listados'),
      });
  }
  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
