import { Component, OnInit } from '@angular/core';
import { BeerService } from '../../services/beer.service';
import { Beer } from '../../models/beer.model';
import { CommonModule } from '@angular/common';
import { BeerCardComponent } from '../beer-card/beer-card.component';
import { BeerDetailsModalComponent } from '../beer-details-modal/beer-details-modal.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-beer-list',
  standalone: true,
  imports: [CommonModule, BeerCardComponent, BeerDetailsModalComponent, FormsModule ],
  templateUrl: './beer-list.component.html',
  styleUrl: './beer-list.component.css'
})
export class BeerListComponent implements OnInit{
  beers: Beer[] = [];

  showBeerDetailsModal: boolean = false;
  selectedBeerId: number | null = null;

  searchBeer: string = '';

  constructor(private beerService: BeerService) { }

  ngOnInit(): void {
    this.loadAllBeers();  
  }

 loadAllBeers(): void {
  this.beerService.getBeers().subscribe({
      next: (data: Beer[]) => {
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

   onSearch(): void {
    if (this.searchBeer.trim()) { // Provjeri da searchBeer nije prazan
      this.beerService.searchBeersByName(this.searchBeer).subscribe({
        next: (data: Beer[]) => {
          this.beers = data;
          console.log('Pronađena piva po pretrazi:', this.beers);
        },
        error: (err) => {
          console.error('Greška pri pretrazi piva:', err);
        }
      });
    } else {
      // Ako je polje za pretragu prazno, ponovno dohvati sva piva
      this.loadAllBeers();
    }
  }

  openBeerDetailsModal(beerId: number): void {
    console.log('openBeerDetailsModal called with ID:', beerId); 
    this.selectedBeerId = beerId; 
    this.showBeerDetailsModal = true; 
    console.log('Modal state after open:', this.selectedBeerId, this.showBeerDetailsModal); 
  }

  closeBeerDetailsModal(): void {
    console.log('closeBeerDetailsModal called.'); 
    this.showBeerDetailsModal = false; 
    this.selectedBeerId = null;
  }
}
