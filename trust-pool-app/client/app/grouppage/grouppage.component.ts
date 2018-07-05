import {
  Component,
  AfterViewInit,
  OnDestroy,
  OnInit,
  ViewChild,
  ElementRef,
  Directive,
  ChangeDetectorRef,
  ViewEncapsulation
} from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { PoolsService } from '../services/pools/pools.service';
import { Router, ActivatedRoute, Routes } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ArrayType } from '@angular/compiler/src/output/output_ast';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Directive({ selector: 'cardinfo' })
export class CardInfo { 
}

@Component({
  selector: 'app-grouppage',
  templateUrl: './grouppage.component.html',
  styleUrls: ['./grouppage.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class GrouppageComponent implements OnInit, AfterViewInit, OnDestroy {
  public cardInfo: ElementRef;
  @ViewChild('cardInfo') set getCardInfo(cardInfo: ElementRef) {
    const groupPage = this;
    setTimeout(() => {
      groupPage.cardInfo = cardInfo;
      if(groupPage.cardInfo){
        groupPage.card.mount(groupPage.cardInfo.nativeElement);
      }
    }, 0);
  }

  card: any;
  cardHandler = this.onChange.bind(this);
  error: string;
  joinRequests: any;
  expenseRequests: any;
  poolid: number;
  isMember: any;
  pool: any = {};
  private sub: any;
  closeResult: string;

  constructor(
    private cd: ChangeDetectorRef,
    private _poolsService: PoolsService,
    private _cookieService: CookieService,
    private _router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal
  ) { }

  ngAfterViewInit() {
    const style = {
      base: {
        color: '#32325d',
        lineHeight: '18px',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    };
    this.card = elements.create('card', { style });
    this.card.addEventListener('change', this.cardHandler);
  }

  ngOnDestroy() {
    this.card.removeEventListener('change', this.cardHandler);
    this.card.destroy();
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      let { poolid, getPool, checkIsMember, getJoinRequests, getExpenseRequests } = this;
      poolid = +params['poolid']; // (+) converts string 'id' to a number
      getPool.call(this, poolid);
      checkIsMember.call(this, poolid);
      getJoinRequests.call(this, poolid);
      getExpenseRequests.call(this, poolid);
    });
  }
  viewGroups() {
    this._router.navigate(['groups']);
  }
  getPool(poolid) {
    this._poolsService.getPool(poolid).subscribe(
      pool => {
        this.pool = pool;
      },
      err => console.log(err),
      () => console.log('done loading pool')
    );
  }

  inviteFriend(poolName, email, message, poolId){
    this._poolsService.inviteFriend(email, message, poolName, poolId, window.location.origin).subscribe(
      res => console.log(res),
      err => console.log(err),
      () => console.log('done inviting friend')
    );
  }

  getJoinRequests(poolid) {
    this._poolsService.getJoinRequests(poolid).subscribe(
      (res: {requests: ArrayType}) => {
        this.joinRequests = res.requests;
        console.log( this.joinRequests,'JOIN REQUESTS')
      }
    );
  }

  getExpenseRequests(poolid) {
    this._poolsService.getExpenseRequests(poolid).subscribe(
      (res) => { this.expenseRequests = res; }
    );
  }

  approveExpenseRequest(request) {
    if (this.isMember.has_voted){
      console.log('YOU HAVE ALREADY VOTED');
      return 'YOU HAVE ALREADY VOTED';
    }
    request.voter_count += 1;
    request.vote_up += this.isMember.vote_power;
    this.isMember.has_voted = 't';

  }

  declineExpenseRequest(request) {
    if (this.isMember.has_voted) {
      console.log('YOU HAVE ALREADY VOTED');
      return 'YOU HAVE ALREADY VOTED';
    }
    request.voter_count += 1;
    request.vote_down += this.isMember.vote_power;
    this.isMember.has_voted = 't';
  }

  acceptRequest(request) {
    request.status = 'accepted';
    console.log(request);
    this._poolsService.resJoinRequest(request).subscribe(
      res => console.log(res),
      err => console.log(err),
      () => console.log('done loading pool')
    );
  }
  declineRequest(request) {
    request.status = 'declined';
    console.log(request);
    this._poolsService.resJoinRequest(request).subscribe(
      res => console.log(res),
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

  openInviteFriendModal(inviteFriendModal) {
    this.modalService.open(inviteFriendModal, { centered: true });
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
      err => console.log('CHECK FILWS',err),
      () => console.log('done checking is member')
    );
  }
  goToExpenseRequestForm(poolid) {
    this._router.navigate(['expenseForm'], { queryParams: { poolid: poolid }});
  }
}
