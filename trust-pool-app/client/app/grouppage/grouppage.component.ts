import { Component, OnInit } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';
import { PoolsService } from '../services/pools/pools.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grouppage',
  templateUrl: './grouppage.component.html',
  styleUrls: ['./grouppage.component.css']
})
export class GrouppageComponent implements OnInit {

  constructor(private _poolsService: PoolsService, private _cookieService: CookieService, private _router: Router) { }

  ngOnInit() {
  }
  viewGroups() {
    this._router.navigate(['groups']);
  }

}
