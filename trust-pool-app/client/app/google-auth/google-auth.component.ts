import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'angular2-cookie/core';
import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider,
  LinkedinLoginProvider
} from 'angular-6-social-login';
import { tap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-google-auth',
  templateUrl: './google-auth.component.html',
  styleUrls: ['./google-auth.component.css']
})
export class GoogleAuthComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router, private socialAuthService: AuthService, private _cookieService: CookieService) { }

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
        
        this._cookieService.put('socialId', userData.id);
        console.log(this._cookieService.getAll(), 'COOKIES');
        this.router.navigate(['home'])
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
