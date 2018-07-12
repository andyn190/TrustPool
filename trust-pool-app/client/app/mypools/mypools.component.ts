import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PoolsService } from '../services/pools/pools.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-mypools',
  templateUrl: './mypools.component.html',
  styleUrls: ['./mypools.component.css']
})
export class MypoolsComponent implements OnInit{
  constructor(
    private _poolsService: PoolsService,
    private _router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) { }
  error: string;

  poolid: number;
  isMember: any;
  userPools: any;
  pools: any = [];
  private sub: any;

  ngOnInit() {
    this._poolsService.getPoolsOfMember().subscribe((pools: Array<object>) => {
      if (pools.length < 1) {
        this.toastr.info('You are not a member of any groups');
      }
      this.userPools = pools;
      this.userPools.forEach((pool) =>{
        const poolsJoin: {
          contribution_amount: number;
          id: number; 
          name: string;
          description: string;
          imageURL: string;
        } = {
          contribution_amount: pool.contrubution_amount,
          id: null,
          name: null,
          description: null,
          imageURL: null
        };
        this._poolsService.getPool(pool.pool_id).subscribe((
          res: { pool: {
            id: number;
            name: string;
            description: string;
            imageURL: string;
          },
          error: string
        }) => {
          const { pool, error } = res;
          if(error){
            return console.log(error);
          }
          poolsJoin.id = pool.id;
          poolsJoin.name = pool.name;
          poolsJoin.description = pool.description;
          poolsJoin.imageURL = pool.imageURL;
          this.pools.push(poolsJoin);
        });
      });
    })
  }
  viewGroup(poolid){
    this._router.navigate(['group/', poolid]);
  }
}
