import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
  }
  clickAccount = (user: number) => {
    this._router.navigate(['account/', user]);
  }
}
