import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Beer } from '../../models/beer.model';
import { CommonModule } from '@angular/common';
import { FavoriteService } from '../../services/favorite.service';

@Component({
  selector: 'app-beer-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './beer-card.component.html',
  styleUrl: './beer-card.component.css'
})
export class BeerCardComponent implements OnInit {
  @Input() beer!: Beer;
  @Output() detailsClick = new EventEmitter<number>();

  isFavorite: boolean = false;

  constructor(private favoriteService: FavoriteService) { }

  ngOnInit(): void {
    this.isFavorite = this.favoriteService.isFavorite(this.beer.id);
  }

  toggleFavorite(event: Event): void {
    if (this.isFavorite) {
      this.favoriteService.removeFavorite(this.beer.id);
    } else {
      this.favoriteService.addFavorite(this.beer);
    }
    this.isFavorite = !this.isFavorite;
  }

  onDetailsClick(event: Event): void {
    console.log('Klik na detalje piva');
    event.stopPropagation(); 
    console.log('Details button clicked for beer ID:', this.beer.id);
    this.detailsClick.emit(this.beer.id); 
  }
}
