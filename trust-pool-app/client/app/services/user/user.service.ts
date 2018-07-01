import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { 
    console.log('USER SERVICE INIT!!!!!');
  }

  getUser() {
    console.log('get USer')
    return this.http.get('/pools');
  }

}
