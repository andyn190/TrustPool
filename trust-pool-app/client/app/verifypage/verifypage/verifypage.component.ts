import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-verifypage',
  templateUrl: './verifypage.component.html',
  styleUrls: ['./verifypage.component.css']
})
export class VerifypageComponent implements OnInit {
  pendingUsers: Array<object>;
  constructor(private _userService: UserService) { }

  ngOnInit() {
    this.getUnverifiedUsers();
  }
  getUnverifiedUsers() {
    this._userService.getPending().subscribe(
      (res:any) => {
        this.pendingUsers = res.users;
      }
    )
  }
  verifyUser(userId) {
    console.log(userId);
    this._userService.approveUser(userId).subscribe(
      (res:any) => {
        console.log(res);
      }
    )
  }
  rejectUser(userId) {
    this._userService.rejectUser(userId).subscribe(
      (res:any) => {
        console.log(res);
      }
    )
  }
}
