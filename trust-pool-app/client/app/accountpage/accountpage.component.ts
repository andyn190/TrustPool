import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-accountpage',
  templateUrl: './accountpage.component.html',
  styleUrls: ['./accountpage.component.css']
})
export class AccountpageComponent implements OnInit {
  user:any;
  firstName:string
  lastName:string
  email:string
  clicked:boolean = false;
  constructor(
    private route: ActivatedRoute,
    private _userService: UserService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit() {
    this._userService.getUser()
      .subscribe(
        (res:any) => {
          this.user = res.user
          this.firstName = res.user.first_name.trim();
          this.lastName = res.user.last_name.trim();
          if(res.user.email) {
            this.email = res.user.email.trim();
          }
        },
        err => console.log(err, 'ERROR'),
        () => console.log('done creating pool')
      );
  }
  userUpdateInfoButton() {
    if(!this.clicked) {
      this.clicked = true;
    } else {
      this.clicked = false;
    }
  }
  updateUserInfo(form) {
    let nameFirst = form.value['user-name'];
    let nameLast = form.value['user-lastName'];
    let newEmail = form.value['user-email'];
    let body = { name: nameFirst, lastName: nameLast, email: newEmail };
    this._userService.updateUserInfo(body).subscribe(
      (success : any) => { this.toastr.success(`Successfully updated ${success.email}`); },
      err => this.toastr.error(err, 'Error updating your account'),
      () => console.log('done updating user info')
    );
  }
}
