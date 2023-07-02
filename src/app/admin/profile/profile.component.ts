import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/userModel';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, update } from 'firebase/database';
import { environment } from 'src/environments/environment';
import * as storage from 'firebase/storage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  userDetails: UserModel[]=[];
  user: any;
  userDetailsForm: FormGroup;

  constructor(public router: Router){
    var user: any = JSON.parse(""+localStorage.getItem('ppuser'));
    this.user = user;
    console.log('ETO YUNG USER NAGLOAD DITO');
    console.log(user);
    this.userDetailsForm = new FormGroup({
      fname: new FormControl(null, [Validators.required]),
      lname: new FormControl(null, [Validators.required]),
      phonenumber: new FormControl(null, [Validators.required]),
      address: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required,]),
    });
  }

  updateUserDetails(userdetail: any){
    const app = initializeApp(environment.firebaseConfig);
    const db = getDatabase(app);

    this.user.fname = userdetail.fname;
    this.user.lname = userdetail.lname;
    this.user.email = userdetail.email;
    this.user.address = userdetail.address;
    this.user.phonenumber = userdetail.phonenumber;
    this.user.password = userdetail.password;
    localStorage.setItem("ppuser",JSON.stringify(this.user))
    update(ref(db, 'users/' + this.user.uid + '/'), userdetail);
    console.log("save changes");
    this.router.navigate([''])

  }

  logout(){
    localStorage.clear();
    this.router.navigate(['']);
    console.log("LOGOUT")
    
  }

}
