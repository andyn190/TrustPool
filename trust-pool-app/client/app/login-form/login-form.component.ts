import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { User } from '../user';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  public userEmail: string;
  public googleUrl: any;
  public errorMsg: string;
  public responseData: any;
  public userPostData: {
    'email': ''
  };

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.errorMsg = '';
    this.googleUrl = '';
    // this.authService.getData().subscribe((post) => {
    //   console.log(post);
    // })
  }
  loginUser(e){
    e.preventDefault();
    let email = e.target.elements[0].value;
    let password = e.target.elements[1].value;
    this.authService.login({email, password} as User)
    .subscribe(user => {
      console.log(user);
    })
  }
}
