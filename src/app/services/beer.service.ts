import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BeerService {
  private apiUrl = 'https://api.adscanner.tv/punkapi/v2/beers'; 

  constructor(private http: HttpClient) { }

  getBeers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // getBeerById(id: number): Observable<any> {
  //   return this.http.get<any>(`${this.apiUrl}/${id}`);
  // }
}
