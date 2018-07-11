import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private loggedIn = new Subject<boolean>();
  loggedIn$ = this.loggedIn.asObservable();
  constructor() { }

  userLogin() {
    this.loggedIn.next(true);
  }
  
  userLogout() {
    this.loggedIn.next(false);
  }
}
