import { Component, OnInit, Optional } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, NgForm } from "@angular/forms";

import { OwnAuthService } from '../services/auth/auth.service';
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
    private auth: OwnAuthService
  ) { }
  public poolid : number;
  private sub : any;
  private user: any;
  public click: boolean;
  private title: string;
  private desc: string;
  private expDate: Date;
  private method: string;

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
    console.log(title, description, expirationDate);
  }
  checkClicked() {
    this.click = !this.click;
    this.method = 'check';
    console.log(this.method);
  }
}
