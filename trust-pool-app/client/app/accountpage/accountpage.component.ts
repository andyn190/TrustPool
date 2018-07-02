import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-accountpage',
  templateUrl: './accountpage.component.html',
  styleUrls: ['./accountpage.component.css']
})
export class AccountpageComponent implements OnInit {
  user:any;
    
  constructor(private route: ActivatedRoute, private _userService: UserService) {
  }

  ngOnInit() {
    this._userService.getUser()
      .subscribe(
        (res:any) => {
          this.user = res.user;
          console.log(this.user);
        },
        err => console.log(err, 'ERROR'),
        () => console.log('done creating pool')
      );
  }

}
