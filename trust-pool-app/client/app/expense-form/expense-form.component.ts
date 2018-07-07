import { Component, OnInit, Optional, Input, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, NgForm } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';

import { OwnAuthService } from '../services/auth/auth.service';
import { PoolsService } from '../services/pools/pools.service'
import { CheckFormComponent } from '../check-form/check-form.component';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


export class NgbdModalContent {
  @Input() name;

  constructor(public activeModal: NgbActiveModal) { }
  closeCheckModal(checkFormModal) {
    this.activeModal.close();
  }
}
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
    private poolService: PoolsService,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {

  }
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
  poolValue: any;

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        this.poolid = params.poolid;
        this.poolValue = (params.value / 100);
      });
    this.auth.checkLogin().subscribe(({ user }: any) => {
      this.user = user;
    })
  }
  handleExpenseSubmit(form) {
    const { title, description, expirationDate } = form.value;
    this.title = title || this.toastr.error('A title must be given to this request');
    this.desc = description || this.toastr.error('A description is needed');
    this.expDate = expirationDate || this.toastr.error('An expiration date is needed');
    console.log(this.amount, this.poolValue);
    if (this.amount > this.poolValue && !this.title && !this.desc && !this.expDate) {
      this.toastr.error('The Amount requested is higher than the Pool Value')
    } else {
      console.log('why is this fucking working?');
      this.poolService.sendExpenseRequestMethod({ method: this.method }).subscribe(({ link }: any) => {
        this.link = link
        const options = {
          request_title: title,
          description,
          expiration_date: this.expDate,
          pool_id: this.poolid,
          method: this.link.id,
          expense_amount: this.amount
        };
        this.poolService.sendExpenseRequest(options).subscribe(({ expenseRequestEntry }: any) => {
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
            this.toastr.success('Successfully sent Expense Request');
          })
        }, err => {
          console.log(err);
          this.toastr.error('Failed to send Expense Request', err);
        });
      }, (err) => {
        console.log(err);
        this.toastr.error('Failed to send Expense Request', err);
      });
    }
  }
  receiveName($event) {
    this.recipientName = $event;
    console.log(this.recipientName);
  }
  receiveEmail($event) {
    this.recipientEmail = $event;
    console.log(this.recipientEmail);
  }
  receiveStreet($event) {
    this.recipientStreet = $event;
    console.log(this.recipientStreet);
  }
  receiveCity($event) {
    this.recipientCity = $event;
    console.log(this.recipientCity);
  }
  receiveState($event) {
    this.recipientState = $event;
    console.log(this.recipientState);

  }
  receiveZip($event) {
    this.recipientZip = $event;
    console.log(this.recipientZip);
  }
  receiveAmount($event) {
    this.amount = $event;
    console.log(this.amount);
  }
  checkClicked() {
    this.click = !this.click;
    this.method = 'Checks';
  }
  openCheckModal(checkFormModal) {
    this.modalService.open(checkFormModal, { size: 'lg' });
    this.method = 'Checks';
  }
}
