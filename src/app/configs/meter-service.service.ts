import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Meter } from '../../app/pages/meters/meter';
import { apiUrl } from './apis';
@Injectable({
  providedIn: 'root',
})
export class MeterServiceService {
  constructor(private http: HttpClient) {}
  getAllProducts() {
    return this.http.get<Meter[]>(apiUrl + 'products');
  }
}
