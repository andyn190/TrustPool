import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { PoolsService } from '../services/pools/pools.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  public pools;
  verified: boolean;
  constructor(
    private _poolsService: PoolsService,
    private _cookieService: CookieService,
    private _router: Router,
    private toastr: ToastrService,
    private _userService: UserService
  ) { }

  ngOnInit() {
    this.getPools();
    this._userService.getUser().subscribe(
      (res:any) => {
        if(res.user.verified === 'true') {
          this.verified = true;
        } else {
          this.verified = false;
        }
      }
    )
  }
  joinGroup(poolid) {
    let socialUser = this._cookieService.get('socialID');
    if (socialUser){
      // send post request with social user id
      this._poolsService.joinPool(poolid, socialUser)
        .subscribe(
          success => {
            this.updateMemberCountView(poolid);
            this.toastr.success('You\'ve successfully joined the group');
          },
          err => this.toastr.error(err, 'ERROR'),
          () => console.log('done joining pool')
        );
    } else {
      // send post request with just poolId in body
      this._poolsService.joinPool(poolid, null).subscribe(
        success => {
          this.updateMemberCountView(poolid);
          this.toastr.success('You\'ve successfully joined the group');
        },
        err => this.toastr.error(err, 'ERROR'),
        () => console.log('done joining pool')
      );
    }

  }
  viewGroup(poolid){
      this._router.navigate(['group/', poolid]);
  }
  updateMemberCountView(poolid){
    this.pools.forEach((pool) => {
      if (pool.id === poolid) {
        pool.members_count += 1;
      }
    });
  }
  getPools() {
    this._poolsService.getPools().subscribe(
      pools => {this.pools = pools},
      err => console.log(err),
      () => console.log('done loading pools')
    );
  }
}
