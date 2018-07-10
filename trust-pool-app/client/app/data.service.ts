import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private loggedIn = new Subject<any>();
  constructor() { }
  getData(): Observable<any> {
    return this.loggedIn.asObservable();
  }
}
