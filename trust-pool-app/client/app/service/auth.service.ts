import { Injectable } from '@angular/core';
import { NgModule } from '@angular/core';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
@NgModule({
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  login(email, password) {
    console.log(email, password);
    return this.http.get('/google', httpOptions).pipe(
      map(res => {res}), catchError(err => of('error found'))
    );
  }
}