import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PoolsService } from '../services/pools/pools.service';

@Component({
  selector: 'app-mypools',
  templateUrl: './mypools.component.html',
  styleUrls: ['./mypools.component.css']
})
export class MypoolsComponent implements OnInit{
  constructor(
    private _poolsService: PoolsService,
    private _router: Router,
    private route: ActivatedRoute
  ) { }
  error: string;

  poolid: number;
  isMember: any;
  userPools: any;
  pools: any = [];
  private sub: any;

  ngOnInit() {
    // this.sub = this.route.params.subscribe(params => {
    //   let { poolid, isMember } = this;
    //   poolid = +params['poolid']; // (+) converts string 'id' to a number
    // });
    this._poolsService.getPoolsOfMember().subscribe(pools => {
      this.userPools = pools;
      this.userPools.forEach((pool) =>{
        const poolsJoin = {};
        poolsJoin['contrubution_amount'] = pool.contrubution_amount
        poolsJoin['id'] = pool.id;
        this._poolsService.getPool(pool.pool_id).subscribe(userPool => {
          poolsJoin['name'] = userPool['name'];
          poolsJoin['description'] = userPool['description'];
          poolsJoin['imageURL'] = userPool['imageURL'];
          this.pools.push(poolsJoin);
          console.log(this.pools);
        });
      });
    })
  }
  viewGroup(poolid){
    this._router.navigate(['group/', poolid]);
  }
}
