import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Beer } from '../models/beer.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BeerService {
  private apiUrl = 'https://api.adscanner.tv/punkapi/v2/beers';

  constructor(private http: HttpClient) { }

  getBeers(): Observable<Beer[]> {
    return this.http.get<Beer[]>(this.apiUrl);
  }

  getBeerById(id: number): Observable<Beer> {
    return this.http.get<Beer[]>(`${this.apiUrl}/${id}`).pipe(
      map(beers => {
        if (beers && beers.length > 0) {
          return beers[0];
        }
        throw new Error('Beer not found');
      })
    );
  }

  getFilteredBeers(
    name: string | null = null,
    abv_gt: number | null = null,
    abv_lt: number | null = null
  ): Observable<Beer[]> {
    let params = new HttpParams();

    if (name && name.trim()) {
      const formattedName = name.trim().replace(/ /g, '_');
      params = params.set('beer_name', formattedName);
    }

    if (abv_gt !== null && abv_gt !== undefined) {
      params = params.set('abv_gt', abv_gt.toString());
    }

    if (abv_lt !== null && abv_lt !== undefined) {
      params = params.set('abv_lt', abv_lt.toString());
    }

    return this.http.get<Beer[]>(this.apiUrl, { params: params });
  }

 
}