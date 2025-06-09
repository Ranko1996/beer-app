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
    // Pozovi metodu getBeers() iz BeerService servisa
    this.beerService.getBeers().subscribe({
      next: (data) => {
        this.beers = data; // Spremi podatke (opcionalno, ali korisno za prikaz)
        console.log('Dohvaćena piva:', this.beers); // Ispiši podatke u konzolu
      },
      error: (err) => {
        console.error('Greška pri dohvatu piva:', err); // Logiraj grešku ako dođe do problema
      },
      complete: () => {
        console.log('Dohvat piva završen.'); // Opcionalno: poruka kada je Observable gotov
      }
    });
  }
}
