import {
  Component,
  AfterViewInit,
  OnDestroy,
  OnInit,
  ViewChild,
  ElementRef,
  Directive,
  ChangeDetectorRef
} from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { PoolsService } from '../services/pools/pools.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, NgForm } from "@angular/forms";

@Directive({ selector: 'cardinfo' })
export class CardInfo { 
}

@Component({
  selector: 'app-grouppage',
  templateUrl: './grouppage.component.html',
  styleUrls: ['./grouppage.component.css']
})
export class GrouppageComponent implements OnInit, AfterViewInit, OnDestroy {
  public cardInfo: ElementRef;
  @ViewChild('cardInfo') set getCardInfo(cardInfo: ElementRef) {
    const groupPage = this;
    setTimeout(() => {
      groupPage.cardInfo = cardInfo;
      groupPage.card.mount(this.cardInfo.nativeElement);
    }, 0);
  }

  card: any;
  cardHandler = this.onChange.bind(this);
  error: string;

  poolid: number;
  isMember: any;
  pool: any;
  private sub: any;

  constructor(
    private cd: ChangeDetectorRef,
    private _poolsService: PoolsService,
    private _cookieService: CookieService,
    private _router: Router,
    private route: ActivatedRoute,
  ) { }

  ngAfterViewInit() {
    this.card = elements.create('card');
    this.card.addEventListener('change', this.cardHandler);
  }

  ngOnDestroy() {
    this.card.removeEventListener('change', this.cardHandler);
    this.card.destroy();
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      let { poolid, isMember, getPool, checkIsMember } = this;
      poolid = +params['poolid']; // (+) converts string 'id' to a number
      getPool.call(this, poolid);
      checkIsMember.call(this, poolid);
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

  async onSubmit(form: NgForm, poolId) {
    const { amount } = form.value;
    const { token, error } = await stripe.createToken(this.card);
    if (!this.isMember) {
      console.log('YOU ARE NOT A MEMBER OF THIS GROUP');
    }
    if (error) {
      console.log('Something is wrong:', error);
    } else {
      const amountArr = amount.toString().split('.');
      let decimalStr = amountArr[1];
      if (decimalStr && decimalStr.length > 2) {
        this.error = 'Too Many Decimals'
      } else if (!decimalStr) {
        this._poolsService.sendContrib(token, poolId, amount * 100)
          .subscribe(
            (result: any) => {
              const { success } = result;
              const { contribution } = success;
              console.log(success, 'SUCCESS');
              const { contribution_amount } = contribution;
              this.pool.pool_value += contribution_amount;
              this.isMember.contrubution_amount += contribution_amount;
            },
            err => console.log(err, 'ERROR'),
            () => console.log('done contributing to pool')
          );
      } else {
        if (decimalStr.length === 1) {
          amountArr[1] = decimalStr + '0';
        }
        this._poolsService.sendContrib(token, poolId, amountArr.join(''))
          .subscribe(
            success => { console.log(success, 'SUCCESS') },
            err => console.log(err, 'ERROR'),
            () => console.log('done contributing to pool')
          );
      }
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
    this._poolsService.checkIsMember(poolid).subscribe((result: { [member: string]: boolean }) => {
      const { member } = result;
      if (member) {
        this.isMember = member;
      } else {
        this.isMember = false;
      }
    },
      err => console.log(err),
      () => console.log('done checking is member')
    );
  }

}
