import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { User } from '../user';

@Component({
  selector: 'app-google-auth',
  templateUrl: './google-auth.component.html',
  styleUrls: ['./google-auth.component.css']
})
export class GoogleAuthComponent implements OnInit {
  constructor(private http: HttpClient, private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }  
  handleGoogleSignIn(e) {
    this.router.navigate(['/login/google']);
    // this.authService.googleLogin().subscribe((data) => {
    //   console.log(data, 'this worked');
    // })
  }  
}
