import { Injectable, NgModule } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, filter, catchError, mergeMap, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from './../../user';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
const googleAuthHeaders = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': 'http://localhost:8080',
    'Vary': 'Origin'
  })
};

@Injectable({
  providedIn: 'root'
})
@NgModule({
})
export class AuthService {
  private loginUrl = '/login/';
  private googleUrl = '/login/google'

  constructor(private http: HttpClient) {
  }

  googleLogin() {
    return this.http.get(this.googleUrl)
    .pipe(
      tap(() => {console.log('this worked')}),
      catchError(this.handleError('GoogleLogin'))
    )
  }
  login (user: User): Observable<User> {
    return this.http.post<User>(this.loginUrl, user, httpOptions).pipe(
      tap((user: User) => console.log('this worked', user.email, user.password)),
      catchError(this.handleError<User>('login'))
    );
  }
  private handleError<T> (operation = 'operation', result? : T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }
  private log(message: string) {
    console.log(message);
  }
}