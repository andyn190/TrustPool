import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { MatSidenavModule, } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatButtonModule } from '@angular/material/button';
import { CookieService } from 'ngx-cookie-service';
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
  LinkedinLoginProvider
} from "angular-6-social-login";
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { GroupsComponent } from './groups/groups.component';
import { CreategroupComponent } from './creategroup/creategroup.component';
import { CreaterequestComponent } from './createrequest/createrequest.component';
import { EbaypageComponent } from './ebaypage/ebaypage.component'
import { OwnAuthService } from './services/auth/auth.service';
import { PoolsService } from './services/pools/pools.service';
import { ContributeComponent } from './contribute/contribute.component';
import { AccountpageComponent } from './accountpage/accountpage.component';
import { GrouppageComponent, CardInfo } from './grouppage/grouppage.component';
import { GoogleAuthComponent } from './google-auth/google-auth.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from './services/user/user.service';
import { MypoolsComponent} from './mypools/mypools.component';


const appRoutes: Routes = [
  { path: 'login', component: LoginFormComponent },
  { path: 'signup', component: SignupFormComponent },
  { path: 'home', component: HomepageComponent },
  { path: 'creategroup', component: CreategroupComponent },
  { path: 'groups', component: GroupsComponent },
  { path: 'group/:poolid', component: GrouppageComponent},
  { path: 'account', component: AccountpageComponent},
  { path: 'createrequest', component: CreaterequestComponent},
  { path: 'ebay', component: EbaypageComponent},
  { path: 'mypools', component: MypoolsComponent }
];

export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
    [
      {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider("463368167455328")
      },
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider("87303288866-1a0i47h32fjal3gb8nat484mvegfs0ge.apps.googleusercontent.com")
      },
      {
        id: LinkedinLoginProvider.PROVIDER_ID,
        provider: new LinkedinLoginProvider("1098828800522-m2ig6bieilc3tpqvmlcpdvrpvn86q4ks.apps.googleusercontent.com")
      },
    ]
  );
  return config;
}

@NgModule({
  declarations: [
    CardInfo,
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
    GrouppageComponent,
    GoogleAuthComponent,
    MypoolsComponent,
    SignupFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MatButtonModule,
    SocialLoginModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    ),
    FormsModule,
    MatToolbarModule,
    MatCardModule,
    MatListModule,
    MatIconModule
  ],
    providers: [OwnAuthService, UserService, PoolsService, CookieService, {
    provide: AuthServiceConfig,
    useFactory: getAuthServiceConfigs
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
