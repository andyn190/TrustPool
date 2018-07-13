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
  }

  getUser() {
    return this.http.get('/user');
  }

  updateUserInfo(body) {
    return this.http.post('/user/update', body, httpOptions);
  }
  getPending() {
    return this.http.get('/user/pending', httpOptions);
  }
  getUserById(userId) {
    return this.http.get(`/user/${userId}`);
  }

  approveUser(userId) {
    const body = { id: userId };
    return this.http.post('user/accept', body);
  }

  rejectUser(userId) {
    const body = { id: userId };
    return this.http.post('user/reject', body);
  }

  verifyAdmin(user) {
    const body = { user: user }
    return this.http.post('user/admin', body);
  }
}
