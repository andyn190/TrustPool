import { Component, OnInit, Input } from '@angular/core';
import { OwnAuthService } from '../services/auth/auth.service';
import { DataService } from '../data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(
    private auth: OwnAuthService,
    private toastr: ToastrService,
    private dataService: DataService
  ) { }
  @Input () loggedIn: boolean
  user: {};
  ngOnInit() {
    this.auth.checkLogin().subscribe(({ user }: any) => {
      this.toastr.success(`${user.first_name.trim()} ${user.last_name.trim()} has successfully logged in`);
      if (user) {
        this.user = user;
        this.loggedIn = true;
      }
    }, (err) => { this.toastr.error('Please log in', err)});
  }
  handleLogout() {
    this.loggedIn = false;
  }
}
