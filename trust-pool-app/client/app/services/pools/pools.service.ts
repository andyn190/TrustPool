import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PoolsService {

  constructor() { }
  getPools() {
    return this.http.get('/pools');
  }
}
