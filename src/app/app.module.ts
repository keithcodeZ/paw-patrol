import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import {MatDividerModule} from '@angular/material/divider';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { LoginpromptdialogComponent } from './loginpromptdialog/loginpromptdialog.component';
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    LandingpageComponent,
    NavbarComponent,
    FooterComponent,
    LoginpromptdialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDividerModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    UserModule,
    AdminModule,
    MatDialogModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
