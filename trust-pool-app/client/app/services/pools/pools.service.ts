import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};


@Injectable({
  providedIn: 'root'
})
export class PoolsService {

  constructor(private http: HttpClient) { }

  getPools() {
    return this.http.get('/pools');
  }

  getPool(poolid) {
    return this.http.get(`/pools/${poolid}`);
  }

  checkIsMember(poolid){
    return this.http.get(`/pools/${poolid}/ismember`);
  }
  
  joinPool(poolid, socialUser) {
    if(socialUser){
    return this.http.post('/pools/join', { poolid, socialUser }, httpOptions);
    }
    return this.http.post('/pools/join', {poolid}, httpOptions);
  }

  sendContrib(stripeToken, poolId, amount){
    return this.http.post('/pools/contribute', { stripeToken, poolId, amount }, httpOptions);
  }
}

