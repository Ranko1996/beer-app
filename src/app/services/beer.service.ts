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

  searchBeersByName(name: string): Observable<Beer[]> {
    const formattedName = name.replace(/ /g, '_');

    let params = new HttpParams().set('beer_name', formattedName);

    return this.http.get<Beer[]>(this.apiUrl, { params: params });
  }

}
