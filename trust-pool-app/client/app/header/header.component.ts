import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { OwnAuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(
    private auth: OwnAuthService
  ) { }
  user: {};
  loggedIn: boolean;
  admin: boolean;
  ngOnInit() {
    this.auth.checkLogin().subscribe(({ user }: any) => {
      if (user) {
        this.user = user;
        this.loggedIn = true;
        if(user.admin === true || user.admin === 'true') {
          this.admin = true;
        }
      }
    });
  }
  handleLogout() {
    this.loggedIn = false;
  }
}
