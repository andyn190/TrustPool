import { Component, OnInit } from '@angular/core';
import { PoolsService } from '../services/pools/pools.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  public pools;
  constructor(private _poolsService: PoolsService) { }

  ngOnInit() {
    this.getPools();
  }

  getPools() {
    this._poolsService.getPools().subscribe(
      pools => {this.pools = pools},
      err => console.log(err),
      () => console.log('done loading pools')
    );
  }
}
