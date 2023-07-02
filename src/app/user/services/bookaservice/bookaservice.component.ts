import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import * as storage from 'firebase/storage';
import { getDatabase, push, ref, set, update } from 'firebase/database';
import { BookingModel } from 'src/app/models/bookingModel';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-bookaservice',
  templateUrl: './bookaservice.component.html',
  styleUrls: ['./bookaservice.component.scss']
})
export class BookaserviceComponent implements OnInit {

  bookingForm: FormGroup;
  data: any;

  // form = new FormGroup({
  //   time: new FormControl()
  // });

  constructor(){
    var services: any = JSON.parse(""+ localStorage.getItem('services'));
    console.log('ETO YUNG SERVICES NA NILAUNCH NATIN');
    console.log(services);
    this.data = services;
    console.log('ETO NAMAN YUNG THIS.DATA');
    console.log(this.data);
    this.bookingForm = new FormGroup({
      address: new FormControl(null, [Validators.required]),
      date: new FormControl(null, [Validators.required]),
      time: new FormControl(null, [Validators.required]),
      petSpecies: new FormControl(null, [Validators.required]),
      petBreed: new FormControl(null, [Validators.required]),
      petAge: new FormControl(null, [Validators.required]),
      petGender: new FormControl(null, [Validators.required]),
      petWeight: new FormControl(null, [Validators.required]),
    })
  }
    


  ngOnInit(): void {
    
  }

  bookAService(booking: BookingModel){
    var user: any = JSON.parse(""+localStorage.getItem('ppuser'));

    var services: any = JSON.parse(""+ localStorage.getItem('services'));

    var post: any = booking;

    const app = initializeApp(environment.firebaseConfig);
    const key = push(ref(getDatabase(app), "services")).key;

    console.log('PRICE SA TAAS');
    services.price = +services.price + +60;
    console.log(services.price);
    // services.price = services.price(to) + 60;


    post.id = key+"";
    post.dateCreated = new Date().toLocaleDateString();
    post.date = new Date(booking.date).toLocaleDateString();
    post.time = new Date(booking.time).toLocaleTimeString();
    post.serviceName = services.title;
    post.price = services.price;
    // console.log('PRICE SA BABA');
    // post.price = services.price + 60;
    post.status = "Submitted";
    post.uid = user.uid;
    post.userName = user.fname+" "+user.lname;

    set(ref(getDatabase(app), "appointments/"+key), post)
    






  }

}
