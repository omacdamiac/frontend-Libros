import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../../models/book.model';
import { environment } from 'src/environments/environment';
import { END_POINTS } from 'src/app/commons/const/constUris';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  constructor(private http: HttpClient) {}

  getListBooks(): Observable<Book[]> {
    let url = `${environment.api_base}${END_POINTS.BOOKS}`;
    return this.http.get<Book[]>(url);
  }
  createBook(request): Observable<Book> {
    let url = `${environment.api_base}${END_POINTS.BOOKS}`;
    return this.http.post<Book>(url, request);
  }
  editBook(book: Book) {
    let url = `${environment.api_base}${END_POINTS.BOOKS}`;
    return this.http.put(url, book);
  }
  deleteBook(libroId: number) {
    let url = `${environment.api_base}${END_POINTS.BOOKS}/${libroId}`;
    return this.http.delete(url);
  }
}
