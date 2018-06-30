import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider,
  LinkedinLoginProvider
} from 'angular-6-social-login';

@Component({
  selector: 'app-google-auth',
  templateUrl: './google-auth.component.html',
  styleUrls: ['./google-auth.component.css']
})
export class GoogleAuthComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router, private socialAuthService: AuthService) { }

  ngOnInit() {
  }
  public socialSignIn(socialPlatform: string) {
    let socialPlatformProvider;
    if (socialPlatform == "facebook") {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    } else if (socialPlatform == "google") {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    } else if (socialPlatform == "linkedin") {
      socialPlatformProvider = LinkedinLoginProvider.PROVIDER_ID;
    }

    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(socialPlatform + " sign in data : ", userData);
        // Now sign-in with userData
        // ...
        this.http.get('/login/google').subscribe(
          data => {
            console.log('this worked', data);
          },
          err => {
            console.log(err, 'this did not work');
          }
        )
      }
    );
  }
  // handleGoogleSignIn(e) {
  //   this.authService.googleLogin().subscribe((data) => {
  //     console.log(data, 'this worked');
  //     this.router.navigate(['home']);
  //   })
  // }  
}
