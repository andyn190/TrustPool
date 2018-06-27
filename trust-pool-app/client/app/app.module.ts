import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { GroupsComponent } from './groups/groups.component';
import { CreategroupComponent } from './creategroup/creategroup.component';
import { UsersgroupComponent } from './usersgroup/usersgroup.component';
import { UserinfoComponent } from './userinfo/userinfo.component';
import { CreaterequestComponent } from './createrequest/createrequest.component';
import { EbaypageComponent } from './ebaypage/ebaypage.component'

const appRoutes: Routes = [
  { path: 'login', component: LoginFormComponent },
  { path: 'home', component: HomepageComponent },
  { path: 'creategroup', component: CreategroupComponent },
  { path: 'groups', component: GroupsComponent },
  { path: 'usersgroup', component: UsersgroupComponent},
  { path: 'userinfo', component: UserinfoComponent},
  { path: 'createrequest', component: CreaterequestComponent},
  { path: 'ebay', component: EbaypageComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    LoginFormComponent,
    HeaderComponent,
    FooterComponent,
    GroupsComponent,
    CreategroupComponent,
    UsersgroupComponent,
    UserinfoComponent,
    CreaterequestComponent,
    EbaypageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
