import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Routes } from '@angular/router';
import { FormGroup, FormBuilder, Validators, NgForm } from "@angular/forms";

@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.css']
})
export class ExpenseFormComponent implements OnInit {
  constructor(
    private _router: Router,
    private routes: Routes,
    private route: ActivatedRoute
  ) { }
  public poolid : number
  private sub : any

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        this.poolid = params.poolid;
      })
  }

}
