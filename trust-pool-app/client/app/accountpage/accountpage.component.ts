import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { DateFormatPipe } from 'angular2-moment';

@Component({
  selector: 'app-accountpage',
  templateUrl: './accountpage.component.html',
  styleUrls: ['./accountpage.component.css']
})
export class AccountpageComponent implements OnInit {
  user:any = {};
  firstName:string
  lastName:string
  email:string
  createdAt:string
  clicked:boolean = false;
  verified: boolean = false;
  file: string;
  photoId: string;
  admin: boolean;
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
          this.createdAt = (new DateFormatPipe()).transform(res.user.createdAt, 'LL');
          this.photoId = res.user.photoID;
          this.admin = res.user.admin;
          this.verifyStatus(res.user.verified);
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
    let photoID = this.file
    let admin = form.value['user-admin'];
    let body = { name: nameFirst, lastName: nameLast, email: newEmail, photoID: photoID, admin: admin };
    this._userService.updateUserInfo(body).subscribe(
      (success : any) => { this.toastr.success(`Successfully updated ${success.email}`); },
      err => this.toastr.error(err, 'Error updating your account'),
      () => console.log('done updating user info')
    );
  }

  encodeImageFileAsURL(element) {
    const outer = this;
    const file = element.target.files[0];
    const reader = new FileReader();
    reader.onloadend = function() {
      outer.file = reader.result;
    }
    reader.readAsDataURL(file);
  }

  verifyStatus(userVerification) {
    if(userVerification === 'true') {
      this.verified = true;
    } else if(userVerification === 'pending') {
      this.verified = true;
    } else {
      this.verified = false;
    }
  }
}
