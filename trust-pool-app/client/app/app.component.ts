import { Component, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent { 
  title = 'TrustPool App';
  clicked:boolean = true;
  headerHide:boolean = false;
  constructor(private http: HttpClient) {
  }
  isClicked() {
    this.clicked = false;
  }
  showHeader() {
    this.headerHide = true;
  }
}
