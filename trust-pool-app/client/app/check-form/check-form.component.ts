import { Component, OnInit, Directive } from '@angular/core';

@Component({
  selector: 'app-check-form',
  templateUrl: './check-form.component.html',
  styleUrls: ['./check-form.component.css']
})

export class CheckFormComponent implements OnInit {
  private physical: boolean;
  constructor() { }
  ngOnInit() {
  }

  checkedPhysical() {
    this.physical = !this.physical;
  }

  handleCheckSubmit(form) {
    console.log(form);
  }
}
