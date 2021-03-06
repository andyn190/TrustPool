import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OwnAuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {
  public signupData = { email: '', password: '', lastName: '', firstName: '' };
  public message = '';
  public data
  constructor(private http: HttpClient, private authService: OwnAuthService, private router: Router) { }

  ngOnInit() {
  }

  signup() {
    this.http.post('/api/signup', this.signupData).subscribe(resp => {
      console.log(resp);
      this.data = resp;
      this.router.navigate(['home']);
    }, err => {
      this.message = err.error.msg;
    });
  }

  goToLoginPage() {
    this.router.navigate(['login']);
  }
}
