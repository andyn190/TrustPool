import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  clicked:boolean = false;
  constructor(private _router: Router, private dataService: DataService) {
    this.dataService.loggedIn$.subscribe(value => {
      this.loggedIn = value;
    })
  }
  
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
