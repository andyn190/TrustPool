import { Component, OnInit } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';
import { PoolsService } from '../services/pools/pools.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  public pools;
  constructor(private _poolsService: PoolsService, private _cookieService: CookieService) { }

  ngOnInit() {
    this.getPools();
  }
  joinGroup(poolid) {
    let socialUser = this._cookieService.get('socialID');
    if (socialUser){
      // send post request with social user id
      this._poolsService.joinPool(poolid, socialUser)
        .subscribe(
          success => { console.log(success, 'Success!'); },
          err => console.log(err, 'ERROR'),
          () => {
            this.pools.forEach((pool) => {
              if(pool.id === poolid){
                pool.members_count += 1;
              }
            });
            console.log('done joining pool')
          }
        );
    } else {
      // send post request with just poolId in body
      this._poolsService.joinPool(poolid, null).subscribe(
        success => {console.log(success, 'Success!');},
        err => console.log(err, 'ERROR'),
        () => console.log('done joining pool')
      );
    }

  }
  getPools() {
    this._poolsService.getPools().subscribe(
      pools => {this.pools = pools},
      err => console.log(err),
      () => console.log('done loading pools')
    );
  }
}
