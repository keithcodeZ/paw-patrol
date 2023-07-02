import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { child, get, getDatabase, onValue, ref } from 'firebase/database';
import { serviceModel } from 'src/app/models/servicesList';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { BookaserviceComponent } from './bookaservice/bookaservice.component';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit{

  services: serviceModel[] = [];
  user : any;

  constructor(public router: Router, public dialog: MatDialog){
    this.services.push({
      uid: '',
      title: '',
      description: '',
      price: 0,
      datecreated: '',
    });

    this.readServices();
  }

  ngOnInit(): void {
    
  }

  readServices(){

    const app = initializeApp(environment.firebaseConfig);
    const db = getDatabase(app);
    const starCountRef = ref(db, 'services/');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      console.log(snapshot.val());
      this.services.splice(0, this.services.length);
      snapshot.forEach((child) =>{
        console.log(child.val());
        // PARA SAN TOOO
        this.services.push(child.val());
        console.log(this.services);
      });
    
    });
  }

  bookAService(service: serviceModel){
    localStorage.setItem('services', JSON.stringify(service));

    const ref = this.dialog.open(BookaserviceComponent, {
      data: this.services
    })

  }

}
