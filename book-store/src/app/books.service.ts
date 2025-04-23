import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from './models';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private apiUrl = 'http://127.0.0.1:8000/api';
  
  constructor(private client: HttpClient) { }

  getBook(id: number): Observable<Book>{
    return this.client.get<Book>(`http://127.0.0.1:8000/api/books/${id}`)
  }

  getBooks(): Observable<Book[]>{
    return this.client.get<Book[]>('http://127.0.0.1:8000/api/books/')
  }

  addBook(book: Book): Observable<Book> {
    return this.client.post<Book>(this.apiUrl, book);
  }
}
