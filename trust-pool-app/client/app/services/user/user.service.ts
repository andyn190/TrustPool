import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { 
    console.log('USER SERVICE INIT!!!!!');
  }

  getUser() {
    console.log('get USer')
    return this.http.get('/pools');
  }

}
