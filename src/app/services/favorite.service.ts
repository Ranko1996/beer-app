import { Injectable } from '@angular/core';
import { Beer } from '../models/beer.model';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private readonly FAVORITES_KEY = 'favoriteBeers';

  constructor() { }

  getFavorites(): Beer[] {
    const favoritesJson = sessionStorage.getItem(this.FAVORITES_KEY);
    return favoritesJson ? JSON.parse(favoritesJson) : [];
  }

  addFavorite(beer: Beer): void {
    const favorites = this.getFavorites();
    if (!favorites.some(favBeer => favBeer.id === beer.id)) {
      favorites.push(beer);
      sessionStorage.setItem(this.FAVORITES_KEY, JSON.stringify(favorites));
    }
  }

  removeFavorite(beerId: number): void {
    let favorites = this.getFavorites();
    favorites = favorites.filter(favBeer => favBeer.id !== beerId);
    sessionStorage.setItem(this.FAVORITES_KEY, JSON.stringify(favorites));
  }

  isFavorite(beerId: number): boolean {
    const favorites = this.getFavorites();
    return favorites.some(favBeer => favBeer.id === beerId);
  }
}
