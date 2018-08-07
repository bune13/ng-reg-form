import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BsDropdownModule, AlertModule, CollapseModule  } from 'ngx-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './shared/auth-guard.service';
import { ChartsModule } from 'ng2-charts';
// import { ApiService } from './shared/api.service';

import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { FooterComponent } from './footer/footer.component';
import { AdminHomeComponent } from './auth/admin/admin-home/admin-home.component';
import { AdminComponent } from './auth/admin/admin.component';
import { LoggedOutComponent } from './logged-out/logged-out.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    HeaderComponent,
    ErrorPageComponent,
    FooterComponent,
    AdminHomeComponent,
    AdminComponent,
    LoggedOutComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    AlertModule.forRoot(),
    ChartsModule,
    AppRoutingModule,
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
  isCollapsed = true;
 }
