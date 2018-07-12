import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-check-form',
  templateUrl: './check-form.component.html',
  styleUrls: ['./check-form.component.scss']
})

export class CheckFormComponent implements OnInit {
  private physical: boolean;
  constructor(private toastrService: ToastrService) { }
  recipientName: string;
  recipientEmail: string;
  streetAddress: string;
  city: string;
  state: string;
  inputZip: string;
  amount: number;
  @Input() poolValue: number; 
  @Output() nameEvent = new EventEmitter<string>();
  @Output() emailEvent = new EventEmitter<string>();
  @Output() streetEvent = new EventEmitter<string>();
  @Output() cityEvent = new EventEmitter<string>();
  @Output() stateEvent = new EventEmitter<string>();
  @Output() zipEvent = new EventEmitter<string>();
  @Output() amountEvent = new EventEmitter<number>();
  ngOnInit() {
  }

  checkedPhysical() {
    this.physical = !this.physical;
  }
  nameChange(event: any) {
    this.recipientName = event.target.value;
    this.nameEvent.emit(this.recipientName);
  }
  emailChange(event: any) {
    this.recipientEmail = event.target.value;
    this.emailEvent.emit(this.recipientEmail)
  }
  streetChange(event: any) {
    this.streetAddress = event.target.value;
    this.streetEvent.emit(this.streetAddress);
  }
  cityChange(event: any) {
    this.city = event.target.value
    this.cityEvent.emit(this.city);
  }
  stateChange(event: any) {
    this.state = event.target.value
    this.stateEvent.emit(this.state);
  }
  zipChange(event: any) {
    this.inputZip = event.target.value;
    this.zipEvent.emit(this.inputZip);
  }
  amountChange(event: any) {
    this.amount = event.target.value;
    this.amountEvent.emit(this.amount);
  }

}
