import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { OwnAuthService } from '../services/auth/auth.service';
import { CookieService } from 'ngx-cookie-service';
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
  private userAuthToken = null;
  private userDisplayName = 'empty';

  constructor(
    private http: HttpClient,
    private router: Router,
    private socialAuthService: AuthService,
    private auth: OwnAuthService,
    private _cookieService: CookieService
  ) { }

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
        this.auth.googleLogin(userData.idToken)
          .subscribe(onSuccess => {
            console.log(onSuccess, 'on Success');
            let { email, googleID, last_name, first_name, id } = onSuccess;
            this._cookieService.set('socialID', googleID.trim());
            this._cookieService.set('email', email.trim());
            this._cookieService.set('lastName', last_name.trim());
            this._cookieService.set('firstName', first_name.trim());
            console.log('login was successful');
            // this._cookieService.get('socialID');
            this.router.navigate(['home']);
          }, onFail => {
            console.log('invalid', onFail);
            window.alert('email is incorrect');
          })
      }
    );
  }
  // handleGoogleSignIn(e) {
  //   this.auth.googleLogin(account).subscribe((data) => {
  //     console.log(data, 'this worked');
  //     this.router.navigate(['home']);
  //   })
  // }  
}
