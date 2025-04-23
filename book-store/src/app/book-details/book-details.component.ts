import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { Book } from '../models';
import { BooksService } from '../books.service';
import { ViewEncapsulation } from '@angular/core';
import { tap, switchMap, catchError, of } from 'rxjs';


@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-book-details',
  imports: [CommonModule,RouterModule],
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDatailComponent {
  book !: Book;
  books !: Book[];
  loaded: boolean;
  @ViewChild('myInput') myInputRef!: ElementRef;

  constructor(private route:ActivatedRoute,
    private bookService:BooksService,
    private location: Location
  ){
    this.loaded = false;
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      tap(() => this.loaded = false),
      switchMap(params => {
        const bookID = Number(params.get('id'));
        return this.bookService.getBook(bookID).pipe(
          catchError(error => {
            console.error('Error loading book:', error);
            return of(null);
          })
        );
      })
    ).subscribe(book => {
      if (book) {
        this.book = book;
        this.loaded = true;
      } else {
        this.loaded = true;
      }
    });
  }

  toReturn(){
    this.location.back();
  }

  previousImage() {
    const index = this.book.images.indexOf(this.book.selectedImage ?? '');
    this.book.selectedImage = this.book.images[(index - 1 + this.book.images.length) % this.book.images.length];
  }
  
  nextImage() {
    const index = this.book.images.indexOf(this.book.selectedImage ?? '');
    this.book.selectedImage = this.book.images[(index + 1) % this.book.images.length];
  }


}


