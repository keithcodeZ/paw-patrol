import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BookingModel } from 'src/app/models/bookingModel';
import { Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { child, get, getDatabase, onValue, ref } from 'firebase/database';
import { serviceModel } from 'src/app/models/servicesList';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-filterdialog',
  templateUrl: './filterdialog.component.html',
  styleUrls: ['./filterdialog.component.scss']
})
export class FilterdialogComponent implements OnInit {

  types: string[]=[];
  services: serviceModel[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data);

    this.readServices();

    // this.getServices();

    
  }

  ngOnInit(): void {
    
  }

  readServices(){
    const app = initializeApp(environment.firebaseConfig);
    const db = getDatabase(app);
    const starCountRef = ref(db, 'services/');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      // console.log(snapshot.val());
      this.services.splice(0, this.services.length);
      snapshot.forEach((child) =>{
        // console.log(child.val());
        // PARA SAN TOOO
        this.services.push(child.val());
        // console.log(this.services);
      });

      console.log(this.services.length);
      console.log(this.services);

      for (var i = 0; i < this.services.length; i++) {
        var serviceType: string;

        serviceType = this.services[i].title;
        console.log(serviceType);

        this.types.push(serviceType);
        // var serviceType = this.types.push(this.services[i].title);
        // this.types = [ this.services[i].title]
        console.log('ETO YUNG TYPES NA NA-STORE SA TYPES ARRAY');
        console.log(this.types);
        
      }
    
    });
    // this.getServices();
  }

  // getServices(){
  //   console.log('NAKARATING KA BA DITO');
  //   console.log(this.services.length);
  //   console.log(this.services);
  //   for (var i = 0; i < this.services.length; i++) {
  //     this.types = [ this.services[i].title]
  //     console.log('ETO YUNG TYPES NA NA-STORE SA TYPES ARRAY');
  //     console.log(this.types);
  //   }
    
  // }

}
