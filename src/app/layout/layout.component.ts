import { Component } from '@angular/core';
import { BeerListComponent } from "../components/beer-list/beer-list.component";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [BeerListComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

}
