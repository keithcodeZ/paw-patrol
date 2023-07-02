import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import * as database from 'firebase/database';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { serviceModel } from 'src/app/models/servicesList';
import { getDatabase, ref, set, update } from 'firebase/database';


@Component({
  selector: 'app-editservicedialog',
  templateUrl: './editservicedialog.component.html',
  styleUrls: ['./editservicedialog.component.scss']
})
export class EditservicedialogComponent implements OnInit {

  // addForm: FormGroup;
  title: string;
  description: string;
  price: number;


  constructor(@Inject(MAT_DIALOG_DATA) public data: serviceModel){
    // this.addForm = new FormGroup({
    //   title: new FormControl('', Validators.required),
    //   description: new FormControl('', Validators.required),
    //   price: new FormControl('', Validators.required),
    // });

    this.title = data.title;
    this.description = data.description;
    this.price = data.price;


    console.log('ETO YUNG DATA NA LOADED');
    console.log(data);

    
  }

  ngOnInit(): void {
  }

  updateService(){

    const app = initializeApp(environment.firebaseConfig);
    const db = getDatabase();

    this.data.title = this.title;
    this.data.description = this.description;
    this.data.price = this.price;

    update(ref(db, 'services/' + this.data.uid), {
      title: this.title,
      description: this.description,
      price: this.price,
    });




    // var post: any = service;
    // console.log('PAKITA MO SAKIN DATECREATED DITO');
    // console.log(this.data.datecreated);
    // // console.log(post.datecreated);

    // console.log('PAKITA MO SAKIN UID DITO');
    // console.log(this.data.uid);

    // service.uid = this.data.uid;
    // service.datecreated = this.data.datecreated;

    // const app = initializeApp(environment.firebaseConfig);
    // const db = database.getDatabase(app);
    // database.update(database.ref(db, 'services/' + this.data.uid), {
    //  service,
    // });
    // console.log('NEW DATA LOADED');
    // console.log(service);
  }

  // onChange(service: serviceModel){
  //   this.updateService(service);
  //   console.log("DATA HAS BEEN CHANGED")

  // }

}
