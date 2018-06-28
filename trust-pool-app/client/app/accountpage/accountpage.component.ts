import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-accountpage',
  templateUrl: './accountpage.component.html',
  styleUrls: ['./accountpage.component.css']
})
export class AccountpageComponent implements OnInit {
  user:string;
    
  constructor(private route: ActivatedRoute) { 
    // this.user = route.snapshot.params('user');
  }

  ngOnInit() {
  }

}
