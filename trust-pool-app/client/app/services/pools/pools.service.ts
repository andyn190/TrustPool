import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class PoolsService {

  constructor(private http: HttpClient) { }

  getPools() {
    return this.http.get('/pools');
  }
}
