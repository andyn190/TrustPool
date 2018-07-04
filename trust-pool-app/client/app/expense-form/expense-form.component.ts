import { Component, OnInit, Optional } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, NgForm } from "@angular/forms";
import { OwnAuthService } from '../services/auth/auth.service';

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
  public poolid : number
  private sub : any
  private user: any

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        this.poolid = params.poolid;
      });
    this.auth.checkLogin().subscribe(({ user }: any) => {
      this.user = user;
    })
  }

}
