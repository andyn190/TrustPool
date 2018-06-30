import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';
import { PoolsService } from '../services/pools/pools.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { StripeService, Elements, Element as StripeElement, ElementsOptions } from "ngx-stripe";

@Component({
  selector: 'app-grouppage',
  templateUrl: './grouppage.component.html',
  styleUrls: ['./grouppage.component.css']
})
export class GrouppageComponent implements OnInit {
  elements: Elements;
  card: StripeElement;
  poolid: number;
  isMember: boolean;
  pool: object;
  private sub: any;

  elementsOptions: ElementsOptions = {
    locale: 'es'
  };
  contribute: FormGroup;
  constructor(
    private _poolsService: PoolsService,
    private _cookieService: CookieService,
    private _router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private stripeService: StripeService
  ) { }

  ngOnInit() {
    this.contribute = this.fb.group({
      name: ['', [Validators.required]]
    });
    this.stripeService.elements(this.elementsOptions)
      .subscribe(elements => {
        this.elements = elements;
        // Only mount the element the first time
        if (!this.card) {
          this.card = this.elements.create('card', {
            style: {
              base: {
                iconColor: '#666EE8',
                color: '#31325F',
                lineHeight: '40px',
                fontWeight: 300,
                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                fontSize: '18px',
                '::placeholder': {
                  color: '#CFD7E0'
                }
              }
            }
          });
          this.card.mount('#card-element');
        }
      });
    
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
  buy() {
    const name = this.contribute.get('name').value;
    this.stripeService
      .createToken(this.card, { name })
      .subscribe(result => {
        if (result.token) {
          // Use the token to create a charge or a customer
          // https://stripe.com/docs/charges
          console.log(result.token);
        } else if (result.error) {
          // Error creating the token
          console.log(result.error.message);
        }
      });
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
