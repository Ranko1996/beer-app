import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Beer } from '../../models/beer.model';
import { BeerService } from '../../services/beer.service';

@Component({
  selector: 'app-beer-details-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './beer-details-modal.component.html',
  styleUrl: './beer-details-modal.component.css'
})
export class BeerDetailsModalComponent implements OnChanges {
  @Input() beerId: number | null = null;
  @Input() isOpen: boolean = false;
  @Output() closeModal = new EventEmitter<void>();

  @Output() close = new EventEmitter<void>();

  beerDetails: Beer | null = null; 
  isLoading: boolean = false; 
  error: string | null = null;

  constructor(private beerService: BeerService) { }

   ngOnChanges(changes: SimpleChanges): void {
    if (changes['isOpen'] && this.isOpen && this.beerId) {
      this.fetchBeerDetails();
    } else if (changes['beerId'] && this.beerId && this.isOpen) {
      this.fetchBeerDetails();
    } else if (changes['isOpen'] && !this.isOpen) {
      this.beerDetails = null;
      this.error = null;
    }
  }

  fetchBeerDetails(): void {
    if (!this.beerId) {
      this.error = "Nema ID-a piva za prikaz detalja.";
      return;
    }

    this.isLoading = true;
    this.error = null; 
    this.beerService.getBeerById(this.beerId).subscribe({
      next: (data: Beer) => {
        this.beerDetails = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Greška pri dohvatu detalja piva:', err);
        this.error = 'Greška pri učitavanju detalja piva. Molimo pokušajte ponovo.';
        this.isLoading = false;
      }
    });
  }

  onClose(): void {
    this.close.emit(); 
  }
}
