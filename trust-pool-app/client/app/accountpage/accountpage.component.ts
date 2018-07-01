import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-accountpage',
  templateUrl: './accountpage.component.html',
  styleUrls: ['./accountpage.component.css']
})
export class AccountpageComponent implements OnInit {
  user:string;
    
  constructor(private route: ActivatedRoute, private _userService: UserService) {

    // this.user = route.snapshot.params('user');

  }

  ngOnInit() {
    this._userService.getUser();
  }

}
