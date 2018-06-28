import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { GroupsComponent } from './groups/groups.component';
import { CreategroupComponent } from './creategroup/creategroup.component';
import { CreaterequestComponent } from './createrequest/createrequest.component';
import { EbaypageComponent } from './ebaypage/ebaypage.component'
import { AuthService } from './services/auth/auth.service';
import { PoolsService } from './services/pools/pools.service';
import { ContributeComponent } from './contribute/contribute.component';
import { AccountpageComponent } from './accountpage/accountpage.component';
import { GrouppageComponent } from './grouppage/grouppage.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginFormComponent },
  { path: 'home', component: HomepageComponent },
  { path: 'creategroup', component: CreategroupComponent },
  { path: 'groups', component: GroupsComponent },
  { path: 'group', component: GrouppageComponent},
  { path: 'account/:user', component: AccountpageComponent},
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
    CreaterequestComponent,
    EbaypageComponent,
    ContributeComponent,
    AccountpageComponent,
    GrouppageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    ),
    FormsModule
  ],
  providers: [AuthService, PoolsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
