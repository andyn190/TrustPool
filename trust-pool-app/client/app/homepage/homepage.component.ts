import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { OwnAuthService } from '../services/auth/auth.service';
import { UserService } from '../services/user/user.service';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  clicked:boolean = false;
  user:any;
  constructor(private _router: Router, private dataService: DataService, private auth: OwnAuthService, private _userService: UserService) {
    this.dataService.loggedIn$.subscribe(value => {
      this.loggedIn = value;
    })
  }
  
  @Input() loggedIn: boolean

  ngOnInit() {
    this.auth.checkLogin().subscribe(({ user }: any) => {
      if (user) {
        this.user = user;
        this.loggedIn = true;
        console.log(this.user)
        this._userService.verifyAdmin(user).subscribe(
          (res:any) => {
            console.log(res);
          }
        )
      }
    });
  }
  showJumboTronText() {
    if(!this.clicked) {
      this.clicked = true;
    } else {
      this.clicked = false;
    }
  }
}
