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
  ngOnInit() {
    this.auth.checkLogin().subscribe(data => {
      if (data.user) {
        this.user = data.user
        this.loggedIn = true;
      }
    });
  }
  handleLogout() {
    this.loggedIn = false;
  }
}
