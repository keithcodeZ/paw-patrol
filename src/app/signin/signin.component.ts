import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { userAccountModel } from '../models/userAccount';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import { getDatabase, ref, child, get } from 'firebase/database';
import { MatDialog } from '@angular/material/dialog';
import { LoginpromptdialogComponent } from '../loginpromptdialog/loginpromptdialog.component';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  error = false;
  hide = true;
  userForm: FormGroup;

  constructor(public router: Router, public dialog: MatDialog){
    this.userForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
  }


  signin(login: userAccountModel){
    var user: any;
    const app = initializeApp(environment.firebaseConfig);
    const dbRef = ref(getDatabase());

    get(child(dbRef, `users/`)).then((snapshot) =>{

      var hasAccount = false;
      var verified = false;

      snapshot.forEach((child) => {
        if (child.val().email == login.email){
          //USER EXISTS IN THE DB

          hasAccount = true;

          if (child.val().password == login.password
            && child.val().position != 'helper'){
              console.log(child.val());
              verified = true;
              //SETTING THE CURRENT USER
              user = child.val();

              //USING LOCAL STORAGE FOR USER
              localStorage.setItem('ppuser', JSON.stringify(user));
              return;

            }

        } else {
          console.log('No data available');
        }

      });

      if (!hasAccount){
        this.dialog.open(LoginpromptdialogComponent, {
          data: 'Account does not exists.',
        });
      } else if (hasAccount && !verified){
        this.dialog.open(LoginpromptdialogComponent, {
          data: 'Wrong username or password.',
        });
      } else if (verified){
        // REDIRECTED TO USER OR ADMIN
        console.log('VERIFIED');
        if (user.role == 'admin'){
          this.router.navigate(['admin/dashboard']);
        } else if (user.role == 'user'){
          this.router.navigate(['user/myappointments']);
        }
        console.log(user);
      }
    })
    .catch((error) => {
      console.error(error);
    });

  }


  getErrorMessageEmail() {
    if (this.userForm.get('email')?.hasError('required')) {
      return 'You must enter a value';
    }
    return this.userForm.get('email')?.hasError('email')
      ? 'Not a valid email'
      : '';
  }

  getErrorMessagePassword() {
    if (this.userForm.get('password')?.hasError('required')) {
      return 'You must enter a value';
    }

    return;
  }


}


