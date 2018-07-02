import { Injectable, NgModule } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
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
export class OwnAuthService {
  private loginUrl = '/login/';
  private googleUrl = '/login/google'

  constructor(private http: HttpClient, private _cookieService: CookieService) {
  }

  googleLogin(token: string) {
    return this.http.post(this.loginUrl, { token })
    .subscribe(onSuccess => {
      console.log(onSuccess, 'on Success');
      let { email, googleID, last_name, first_name, id } = onSuccess;
      this._cookieService.set('googleID', googleID.trim());
      this._cookieService.set('email', email.trim());
      this._cookieService.set('lastName', last_name.trim());
      this._cookieService.set('firstName', first_name.trim());
      console.log('login was successful');
      return onSuccess;
    }, onFail => {
      console.log('invalid', onFail);
      window.alert('email is incorrect');
    })
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