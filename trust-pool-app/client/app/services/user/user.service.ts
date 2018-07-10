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
    return this.http.get('/user');
  }

  updateUserInfo(body) {
    return this.http.post('/user/update', body, httpOptions);
  }
  getUserById(userId) {
    return this.http.get(`/user/${userId}`)
  }

}
