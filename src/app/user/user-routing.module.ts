import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { MyappointmentsComponent } from './myappointments/myappointments.component';
import { ProfileComponent } from './profile/profile.component';
import { ServicesComponent } from './services/services.component';

const routes: Routes = [{
    path: '',
    component: MainComponent,
    children: [
        {
            path: 'myappointments',
            component: MyappointmentsComponent,
        },
        {
            path: 'services',
            component: ServicesComponent,
        },
        {
            path: 'profile',
            component: ProfileComponent
        }
    ]

}];

@NgModule ({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class UserRoutingModule{}