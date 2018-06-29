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
export class GroupCreateService {

  constructor(private http: HttpClient) { }
  
  createGroup(name, imgUrl, description) {
    console.log(name, imgUrl, description);
    return this.http.post('/create', httpOptions).pipe(
      map(res => {console.log(res)}), catchError(err => of('error found'))
    );
  }
}
