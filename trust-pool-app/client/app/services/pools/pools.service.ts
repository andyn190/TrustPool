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

  getJoinRequests(poolid) {
    return this.http.get(`/pools/${poolid}/joinrequests`);
  }

  getExpenseRequests(poolid) {
    return this.http.get(`/pools/${poolid}/expenserequests`);
  }

  checkIsMember(poolid){
    return this.http.get(`/pools/${poolid}/ismember`);
  }
  
  getPoolsOfMember() {
    return this.http.get('/pools/member/poolsOfMember');
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

  resJoinRequest(joinRequest){
    return this.http.post('/pools/joinrequests', { joinRequest }, httpOptions);
  }

  sendExpenseRequest(options: object) {
    return this.http.post('/pools/expense', options, httpOptions);
  }

  inviteFriend(email, message, poolName, poolId, url){
    return this.http.post('/pools/mailinvite', { email, message, poolName, poolId, url }, httpOptions)
  }
}

