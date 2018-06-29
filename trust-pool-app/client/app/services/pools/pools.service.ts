import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  responseType: 'text',
};


@Injectable({
  providedIn: 'root'
})
export class PoolsService {

  constructor(private http: HttpClient) { }

  getPools() {
    return this.http.get('/pools');
  }
  
  joinPool(poolid, socialUser) {
    if(socialUser){
    return this.http.post('/pools/join', { poolid, socialUser }, httpOptions);
    }
    return this.http.post('/pools/join', {poolid}, httpOptions);
    // .pipe(
    //   tap((pool) => console.log(`user added to pool w/ id=${poolid}, ${pool}`)),
    // );
  }
}

