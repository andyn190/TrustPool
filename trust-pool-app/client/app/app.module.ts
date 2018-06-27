import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
<<<<<<< HEAD
import { HomepageComponent } from './homepage/homepage.component';
=======
import { LoginFormComponent } from './login-form/login-form.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component'
>>>>>>> 47468245e68b26947eb0e804d5218b9c9d253e58

@NgModule({
  declarations: [
    AppComponent,
<<<<<<< HEAD
    HomepageComponent,
=======
    LoginFormComponent,
    HeaderComponent,
    FooterComponent
>>>>>>> 47468245e68b26947eb0e804d5218b9c9d253e58
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
