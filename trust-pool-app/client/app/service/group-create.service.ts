import { Injectable } from '@angular/core';
import { NgModule } from '@angular/core';
import { map, filter, catchError, mergeMap, subscribeOn } from 'rxjs/operators';
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
  
  createGroup(pool) {
     const body = {pool};
    return this.http.post('/pools/create', body, httpOptions)
  }
}
