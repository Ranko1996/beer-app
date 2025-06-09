import { Component, OnInit } from '@angular/core';
import { BeerService } from '../../services/beer.service';

@Component({
  selector: 'app-beer-list',
  standalone: true,
  imports: [],
  templateUrl: './beer-list.component.html',
  styleUrl: './beer-list.component.css'
})
export class BeerListComponent implements OnInit{
  beers: any[] = [];

  constructor(private beerService: BeerService) { }

   ngOnInit(): void {
    this.beerService.getBeers().subscribe({
      next: (data) => {
        this.beers = data; 
        console.log('Dohvaćena piva:', this.beers);
      },
      error: (err) => {
        console.error('Greška pri dohvatu piva:', err); 
      },
      complete: () => {
        console.log('Dohvat piva završen.'); 
      }
    });
  }
}
