import { Component, OnInit, Optional } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, NgForm } from "@angular/forms";

import { OwnAuthService } from '../services/auth/auth.service';
import { PoolsService } from '../services/pools/pools.service'
import { CheckFormComponent } from '../check-form/check-form.component';

@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.css']
})
@Optional()
export class ExpenseFormComponent implements OnInit {
  constructor(
    private _router: Router,
    private route: ActivatedRoute,
    private auth: OwnAuthService,
    private poolService: PoolsService
  ) { }
  public poolid: number;
  private sub: any;
  private user: any;
  public click: boolean;
  private title: string;
  private desc: string;
  private expDate: Date;
  private method: string;
  amount: number;
  link: any;
  recipientName: string;
  recipientEmail: string;
  recipientStreet: string;
  recipientCity: string;
  recipientState: string;
  recipientZip: string;

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        this.poolid = params.poolid;
      });
    this.auth.checkLogin().subscribe(({ user }: any) => {
      this.user = user;
    })
  }
  handleExpenseSubmit(form) {
    const { title, description, expirationDate } = form.value;
    this.title = title;
    this.desc = description;
    this.expDate = expirationDate;
    const options = {
      request_title: title,
      description,
      expiration_date: expirationDate,
      pool_id: this.poolid,
      method: this.link.id,
      expense_amount: this.amount
    };
    this.poolService.sendExpenseRequest(options).subscribe(({ expenseRequestEntry }: any) => {
      console.log(expenseRequestEntry.id);
      let checkInfo;
      if (this.recipientStreet) {
        checkInfo = {
          name: this.recipientName,
          email: this.recipientEmail,
          address: `${this.recipientStreet} ${this.recipientCity} ${this.recipientState} ${this.recipientZip}`,
          description: this.desc,
          methodId: this.link.id,
          amount: this.amount
        }
      }
      this.poolService.sendCheckInfo(checkInfo).subscribe((check) => {
        console.log(check);
      })
    }, err => {
      console.log(err);
    })
  }
  receiveName($event) {
    this.recipientName = $event;
  }
  receiveEmail($event) {
    this.recipientEmail = $event;
  }
  receiveStreet($event) {
    this.recipientStreet = $event;
  }
  receiveCity($event) {
    this.recipientCity = $event;
  }
  receiveState($event) {
    this.recipientState = $event;

  }
  receiveZip($event) {
    this.recipientZip = $event;
  }
  receiveAmount($event) {
    this.amount = $event;
    console.log(this.amount);
  }
  checkClicked() {
    this.click = !this.click;
    this.method = 'Checks';
    this.poolService.sendExpenseRequestMethod({ method: this.method }).subscribe(({ link }: any) => {
      this.link = link
    })
  }
}
