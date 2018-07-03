import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OwnAuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { User } from '../user';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  public loginData = { email: '', password: ''};
  public message = '';
  public data
  constructor(private http: HttpClient, private authService: OwnAuthService, private router: Router) { }

  ngOnInit() {

  }
  login() {
    this.http.post<any[]>('/api/signin', this.loginData).subscribe(resp => {
      this.data = resp;
      localStorage.setItem('jwtToken', this.data.token);
      this.router.navigate(['home']);
    }, err => {
      this.message = err.error.msg;
    });
  }
}
