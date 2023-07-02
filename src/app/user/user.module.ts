import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from '../footer/footer.component';
import { MainComponent } from './main/main.component';
import { MyappointmentsComponent } from './myappointments/myappointments.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileComponent } from './profile/profile.component';
import { ServicesComponent } from './services/services.component';
import { UserRoutingModule } from './user-routing.module';
import { MatDialog, MatDialogActions, MatDialogModule } from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { BookaserviceComponent } from './services/bookaservice/bookaservice.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatTimepickerModule } from 'mat-timepicker';
import { HttpClientModule } from '@angular/common/http';
import {MatSelectModule} from '@angular/material/select';
import { EditappointmentdialogComponent } from './myappointments/editappointmentdialog/editappointmentdialog.component';
import { ViewappointmentdialogComponent } from './myappointments/viewappointmentdialog/viewappointmentdialog.component';
import { CancelappointmentdialogComponent } from './myappointments/cancelappointmentdialog/cancelappointmentdialog.component';


@NgModule({
    declarations: [
        MainComponent,
        NavbarComponent,
        MyappointmentsComponent,
        ServicesComponent,
        ProfileComponent,
        // FooterComponent,
        BookaserviceComponent,
        EditappointmentdialogComponent,
        ViewappointmentdialogComponent,
        CancelappointmentdialogComponent

    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        UserRoutingModule,
        MatTableModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        MatInputModule,
        MatFormFieldModule,
        MatIconModule,
        MatButtonModule,
        MatDialogModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatTimepickerModule,
        HttpClientModule,
        MatOptionModule,
        MatSelectModule
    ],

})

export class UserModule {}