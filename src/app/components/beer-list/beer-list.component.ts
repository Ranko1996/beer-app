import { Component, OnInit } from '@angular/core';
import { BeerService } from '../../services/beer.service';
import { Beer } from '../../models/beer.model';
import { CommonModule } from '@angular/common';
import { BeerCardComponent } from '../beer-card/beer-card.component';
import { BeerDetailsModalComponent } from '../beer-details-modal/beer-details-modal.component';
import { FormsModule } from '@angular/forms';
import { FavoriteService } from '../../services/favorite.service';
import { NgxSliderModule, Options } from '@angular-slider/ngx-slider';
import { Observable } from 'rxjs'; // Dodaj Observable import

@Component({
  selector: 'app-beer-list',
  standalone: true,
  imports: [CommonModule, BeerCardComponent, BeerDetailsModalComponent, FormsModule, NgxSliderModule ],
  templateUrl: './beer-list.component.html',
  styleUrl: './beer-list.component.css'
})
export class BeerListComponent implements OnInit{
  beers: Beer[] = [];

  showBeerDetailsModal: boolean = false;
  selectedBeerId: number | null = null;

  searchBeer: string = '';

  showFavoritesOnly: boolean = false;
  private allBeersCache: Beer[] = [];

  sortCriteria: string = 'name';

  minValue: number = 0;
  maxValue: number = 100;
  options: Options = {
    floor: 0,
    ceil: 100,
  };

  constructor(private beerService: BeerService, private favoriteService: FavoriteService) { }

  ngOnInit(): void {
    this.fetchAndApplyFilters();
  }

  private fetchAndApplyFilters(): void {
  const nameFilter = this.searchBeer.trim() ? this.searchBeer.trim() : null;


  const abvGtFilter = this.minValue; 
  const abvLtFilter = this.maxValue;

  this.beerService.getFilteredBeers(nameFilter, abvGtFilter, abvLtFilter).subscribe({
    next: (data: Beer[]) => {
      this.allBeersCache = data; 
      this.applyLocalFiltersAndSort(); 
    },
    error: (err) => {
      console.error('Greška pri dohvatu piva:', err);
    }
  });
}

  private applyLocalFiltersAndSort(): void {
    let processedBeers = [...this.allBeersCache];
    if (this.showFavoritesOnly) {
      const favoriteIds = this.favoriteService.getFavorites().map(fav => fav.id);
      processedBeers = processedBeers.filter(beer => favoriteIds.includes(beer.id));
    }

    this.sortBeers(processedBeers);

    this.beers = processedBeers;
  }

  onSearch(): void {
    this.fetchAndApplyFilters(); 
  }

  onFavoriteToggle(): void {
    this.applyLocalFiltersAndSort();
  }

  onSortChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.sortCriteria = selectElement.value;
    this.applyLocalFiltersAndSort(); 
  }

  sortBeers(beersToSort: Beer[]): void {
    if (this.sortCriteria === 'name') {
      beersToSort.sort((a, b) => a.name.localeCompare(b.name));
    } else if (this.sortCriteria === 'abv') {
      beersToSort.sort((a, b) => (a.abv || 0) - (b.abv || 0));
    }
  }

  onAbvChange(): void {
    this.fetchAndApplyFilters();
  }

  openBeerDetailsModal(beerId: number): void {
    this.selectedBeerId = beerId;
    this.showBeerDetailsModal = true;
  }

  closeBeerDetailsModal(): void {
    this.showBeerDetailsModal = false;
    this.selectedBeerId = null;
  }
}