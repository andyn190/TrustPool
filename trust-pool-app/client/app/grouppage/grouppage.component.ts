import { Component, OnInit } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';
import { PoolsService } from '../services/pools/pools.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-grouppage',
  templateUrl: './grouppage.component.html',
  styleUrls: ['./grouppage.component.css']
})
export class GrouppageComponent implements OnInit {
  poolid: number;
  pool: object;
  private sub: any;
  constructor(private _poolsService: PoolsService, private _cookieService: CookieService, private _router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.poolid = +params['poolid']; // (+) converts string 'id' to a number
      console.log(this.poolid, 'POOL ID');
      this.getPool(this.poolid);
      // In a real app: dispatch action to load the details here.
    });
  }
  viewGroups() {
    this._router.navigate(['groups']);
  }
  getPool(poolid) {
    this._poolsService.getPool(poolid).subscribe(
      pool => {
        this.pool = pool;
        console.log(pool, 'SUCCESS!!')
      },
      err => console.log(err),
      () => console.log('done loading pools')
    );
  }

}
