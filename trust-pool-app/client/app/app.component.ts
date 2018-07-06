import { Component, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { OwnAuthService } from './services/auth/auth.service';
import { Router, ActivatedRoute, Routes } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent { 
  title = 'TrustPool App';
  clicked:boolean = true;
  headerHide:boolean = false;
  loggedIn:boolean;
  user: any
  constructor(private auth: OwnAuthService, private router: Router) {
  }
  ngOnInit() {
    this.auth.checkLogin().subscribe(({ user }: any) => {
      if (user) {
        this.user = user;
        this.loggedIn = true;
        this.clicked = false;
        this.headerHide = true;
        this.router.navigate(['home']);
      }
    });
  }
  isClicked() {
    this.clicked = false;
  }
  showHeader() {
    this.headerHide = true;
  }
}
