import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Book } from '../models';
import { BooksService } from '../books.service';
import { CartService } from '../cart.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  books!: Book[];
  filteredBooks!: Book[];
  searchTerm: string = '';
  quantities: { [key: number]: number } = {}; 
  loaded: boolean = false;

  constructor(
    private booksService: BooksService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loaded = false;
    this.booksService.getBooks().subscribe((books: Book[]) => {
      this.books = books;
      this.filteredBooks = books;
      //initializing quantities for each book to 1
      books.forEach(book => {
        this.quantities[book.id] = 1;
      });
      this.loaded = true;
    });
  }

  filterBooks(): void {
    if (!this.searchTerm.trim()) {
      this.filteredBooks = [...this.books];
    } else {
      this.filteredBooks = this.books.filter(book =>
        book.title.toLowerCase().startsWith(this.searchTerm.toLowerCase())
      );
    }
  }

  addToCart(book: Book) {
    const quantity = this.quantities[book.id] || 1;
    if (quantity > 0) {
      for (let i = 0; i < quantity; i++) {
        this.cartService.addToCart(book);
      }
      alert(`${quantity} x "${book.title}" добавлено в корзину!`);
      this.quantities[book.id] = 1;
    } else {
      alert('Введите корректное количество!');
    }
  }
}