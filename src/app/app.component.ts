import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pawpatrol';
  constructor(public router: Router){
    //DEFAULT ROUTE
    console.log("APP ROOT LANDING PAGE");
    // router.navigate(["landingpage"]);

    this.checkIsLoggedIn();
  }

  checkIsLoggedIn(){
    var user: any = JSON.parse(""+localStorage.getItem('ppuser'));
    
    console.log(user);

    if (user == null){
      this.router.navigate(['landingpage']);
    } else if (user.role == 'user'){
      this.router.navigate(['user/myappointments']);
    } else if (user.role == 'admin'){
      this.router.navigate(['admin/dashboard']);
    } else {

    }
  }
}
