import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ViewEncapsulation } from '@angular/core';
import { FooterComponent } from './footer/footer.component';


@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-root',
  imports: [RouterOutlet,RouterModule,FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'book-store';
}
