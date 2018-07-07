import { Injectable, NgModule } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, filter, catchError, mergeMap, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
const googleAuthHeaders = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
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

  constructor(private http: HttpClient) {
  }
  checkLogin() {
    return this.http.get('/login');
  }
  googleLogin() {
    console.log(googleAuthHeaders);
    return this.http.get(this.googleUrl);
  }
  // login (user: User): Observable<User> {
  //   return this.http.post<User>(this.loginUrl, user, httpOptions).pipe(
  //     tap((user: User) => console.log('this worked', user.email, user.password)),
  //     catchError(this.handleError<User>('login'))
  //   );
  // }
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