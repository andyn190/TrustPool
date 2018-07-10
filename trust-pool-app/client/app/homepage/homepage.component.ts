import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  clicked:boolean = false;
  constructor(private _router: Router) { }
  
  @Input() loggedIn: boolean

  ngOnInit() {

  }
  showJumboTronText() {
    if(!this.clicked) {
      this.clicked = true;
    } else {
      this.clicked = false;
    }
  }
}
