import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent
  },
  {
    path: 'landingpage',
    component: LandingpageComponent,
  },
  {
    path: 'signin',
    component: SigninComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user-routing.module').then(m => m.UserRoutingModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin-routing.module').then(m => m.AdminRoutingModule)
  },
  {
    path: '**', redirectTo: '', pathMatch: 'full'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
