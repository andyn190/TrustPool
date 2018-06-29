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
  getCookie() {
    this._cookieService.put('name', 'testcookie');
    console.log(this._cookieService.getAll(), 'COOKIES');
  }
  getPools() {
    this._poolsService.getPools().subscribe(
      pools => {this.pools = pools},
      err => console.log(err),
      () => console.log('done loading pools')
    );
  }
}
