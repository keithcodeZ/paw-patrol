import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import { getDatabase, ref, set, update } from 'firebase/database';
import { BookingModel } from 'src/app/models/bookingModel';

@Component({
  selector: 'app-cancelappointmentdialog',
  templateUrl: './cancelappointmentdialog.component.html',
  styleUrls: ['./cancelappointmentdialog.component.scss']
})
export class CancelappointmentdialogComponent implements OnInit {

  status: string = 'Cancelled by User';

  constructor(@Inject(MAT_DIALOG_DATA) public data: BookingModel){
    // this.status = data.status;
  }

  ngOnInit(): void {
    
  }

  cancelStatus(){
    const app = initializeApp(environment.firebaseConfig);
    const db = getDatabase();

    this.data.status = this.status;

    update(ref(db, 'appointments/' + this.data.id), {
      status: this.status,
    });

  }

}
