import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import * as database from 'firebase/database';
import { serviceModel } from 'src/app/models/servicesList';
import { getDatabase, push, ref, set } from 'firebase/database';

@Component({
  selector: 'app-addservicedialog',
  templateUrl: './addservicedialog.component.html',
  styleUrls: ['./addservicedialog.component.scss']
})
export class AddservicedialogComponent implements OnInit {

  addForm: FormGroup;
  // data: serviceModel;

  constructor(){
    this.addForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    
  }

  createService(service: serviceModel){
    console.log(service);
    var post: any = service;
    const app = initializeApp(environment.firebaseConfig);
    const key = push(ref(getDatabase(app), "services")).key;

    post.uid = key+"";
    post.datecreated = new Date().toLocaleDateString()

    set(ref(getDatabase(app), "services/"+key), post)

    
  }


}
