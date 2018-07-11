import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { OwnAuthService } from './services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  loggedIn$ = this.loggedIn.asObservable();
  constructor(private auth: OwnAuthService) { }

  userLogin(userStatus: boolean) {
    this.loggedIn.value = userStatus;
  }
  userLogout() {

  }
}
