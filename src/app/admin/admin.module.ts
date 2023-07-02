import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminRoutingModule } from './admin-routing.module';
import { MainComponent } from './main/main.component';
import { ServicesComponent } from './services/services.component';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import {MatTableModule} from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { AddservicedialogComponent } from './services/addservicedialog/addservicedialog.component';
import { EditservicedialogComponent } from './services/editservicedialog/editservicedialog.component';
import { ConfirmdeletedialogComponent } from './services/confirmdeletedialog/confirmdeletedialog.component';
import { MatDialog, MatDialogActions, MatDialogModule } from '@angular/material/dialog';
import { EditstatusdialogComponent } from './dashboard/editstatusdialog/editstatusdialog.component';
import { ViewbookingdialogComponent } from './dashboard/viewbookingdialog/viewbookingdialog.component';
import { MatOptionModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import { FilterdialogComponent } from './dashboard/filterdialog/filterdialog.component';

import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule} from '@angular/material/core';




@NgModule({
    declarations:[
        MainComponent,
        ServicesComponent,
        ProfileComponent,
        DashboardComponent,
        NavbarComponent,
        AddservicedialogComponent,
        EditservicedialogComponent,
        ConfirmdeletedialogComponent,
        EditstatusdialogComponent,
        ViewbookingdialogComponent,
        FilterdialogComponent

    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AdminRoutingModule,
        MatTableModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        MatInputModule,
        MatFormFieldModule,
        MatIconModule,
        MatButtonModule,
        MatDialogModule,
        MatOptionModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,


    ],
})

export class AdminModule {}