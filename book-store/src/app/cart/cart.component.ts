import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Book } from '../models';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  books: Book[] = [];
  loaded: boolean = false;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.loaded = true;
    }, 500);
    
    this.cartService.getBooks().subscribe({
      next: (books: Book[]) => {
        this.books = books;
        this.loaded = true;
      },
      error: (err) => {
        console.error('Error loading cart books:', err);
        this.loaded = true;
      }
    });
  }

  remeveBook(book: Book): void {
    this.cartService.removeBook(book);
  }
}