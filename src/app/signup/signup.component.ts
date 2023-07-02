import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from '../models/userModel';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import { getDatabase, push, ref, set } from 'firebase/database';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {
  error = false;
  userForm: FormGroup;
  hide = true;

  constructor(public router: Router){

    this.userForm = new FormGroup({
      fname: new FormControl(null, [Validators.required]),
      lname: new FormControl(null, [Validators.required]),
      phonenumber: new FormControl(null, [Validators.required]),
      address: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required,]),
    });
  }

  ngOnInit(): void {
    
  }

  signup(registerUser: UserModel){

    console.log(registerUser);

    if (
      this.userForm.get('fname')?.hasError('required') ||
      this.userForm.get('lname')?.hasError('required') ||
      this.userForm.get('phonenumber')?.hasError('required') ||
      this.userForm.get('address')?.hasError('required') ||
      this.userForm.get('email')?.hasError('required') ||
      this.userForm.get('password')?.hasError('required')){

        this.error = true;

    } else{

      var post: any = registerUser;
      const app = initializeApp(environment.firebaseConfig)
      const key = push(ref(getDatabase(app), "users")).key;
      post.role = "user"

      post.uid = key+"";
      post.dateCreated = new Date().toLocaleDateString()

      set(ref(getDatabase(app), "users/"+key), post)




      this.router.navigate(['/signin'])

    }

  }


  getErrorMessage(){
    if(this.error){
      return 'Please fill out all the required fields'
    }
    return;
  }

}
