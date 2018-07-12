import { Component, OnInit, Input } from '@angular/core';
import { OwnAuthService } from '../services/auth/auth.service';
import { DataService } from '../data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(
    private auth: OwnAuthService,
    private toastr: ToastrService,
    private dataService: DataService
  ) { }
  @Input () loggedIn: boolean
  user: {};
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
    }, (err) => { this.toastr.error('Please log in', err)});
  }
  handleLogout() {
    this.loggedIn = false;
  }
}
