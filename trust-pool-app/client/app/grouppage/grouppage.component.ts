import {
  Component,
  AfterViewInit,
  OnDestroy,
  OnInit,
  ViewChild,
  ElementRef,
  Directive,
  ChangeDetectorRef } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';
import { PoolsService } from '../services/pools/pools.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, NgForm } from "@angular/forms";

@Directive({ selector: 'contrib-form' })
export class ContribForm {
}

@Component({
  selector: 'app-grouppage',
  templateUrl: './grouppage.component.html',
  styleUrls: ['./grouppage.component.css']
})
export class GrouppageComponent implements OnInit, AfterViewInit, OnDestroy {
  public cardInfo: ElementRef;
   
  @ViewChild('cardInfo') set content(cardInfo: ElementRef) {
    this.cardInfo = cardInfo;
  }

  card: any;
  cardHandler = this.onChange.bind(this);
  error: string;

  poolid: number;
  isMember: boolean;
  pool: object;
  private sub: any;

  constructor(
    private cd: ChangeDetectorRef,
    private _poolsService: PoolsService,
    private _cookieService: CookieService,
    private _router: Router,
    private route: ActivatedRoute,
  ) { }

  ngAfterViewInit(){
    console.log(this.cardInfo,'CARD INFO');
    this.card = elements.create('card');
    this.card.mount(this.cardInfo.nativeElement);

    this.card.addEventListener('change', this.cardHandler);
  }

  ngOnDestroy() {
    this.card.removeEventListener('change', this.cardHandler);
    this.card.destroy();
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      let { poolid, isMember, getPool, checkIsMember  } = this;
      poolid = +params['poolid']; // (+) converts string 'id' to a number
      console.log(poolid, 'POOL ID');
      getPool.call(this, poolid);
      checkIsMember.call(this, poolid);
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
        console.log(pool, 'SUCCESS!')
      },
      err => console.log(err),
      () => console.log('done loading pool')
    );
  }

  onChange({ error }) {
    if (error) {
      this.error = error.message;
    } else {
      this.error = null;
    }
    this.cd.detectChanges();
  }

  async onSubmit(form: NgForm, poolId, amount) {
    const { token, error } = await stripe.createToken(this.card);
    if (error) {
      console.log('Something is wrong:', error);
    } else {
      console.log('Success!', token, 'TOKEN', poolId, 'POOLID', amount, 'AMOUNT');
      // poolId,
      //   amount,
      //   stripeToken
      // ...send the token to the your backend to process the charge
      this._poolsService.sendContrib(token, poolId, amount)
        .subscribe(
          success => { console.log(success, 'SUCCESS')},
          err => console.log(err, 'ERROR'),
          () => console.log('done contributing to pool')
        );
    }
  }

  joinGroup(poolid) {
    let socialUser = this._cookieService.get('socialID');
    let groupPage = this;
    if (socialUser) {
      // send post request with social user id
      
      this._poolsService.joinPool(poolid, socialUser)
        .subscribe(
          success => {
            groupPage.checkIsMember(poolid);
            console.log(success, 'Success!!!');
          },
          err => console.log(err, 'ERROR'),
          () => console.log('done joining pool')
        );
    } else {
      // send post request with just poolId in body
      this._poolsService.joinPool(poolid, null).subscribe(
        success => {
          groupPage.checkIsMember(poolid);
          console.log(success, 'Success!');
        },
        err => console.log(err, 'ERROR'),
        () => console.log('done joining pool')
      );
    }
  }

  checkIsMember(poolid) {
    this._poolsService.checkIsMember(poolid).subscribe((result: { [member: string] : boolean  }) => {
      const { member } = result;
      if(member) {
        this.isMember = member;
      } else {
        this.isMember = false;
      }
      console.log(result.member, 'MEMBER')
    },
      err => console.log(err),
      () => console.log('done checking is member')
    );
  }

}
