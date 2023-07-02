import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, update } from 'firebase/database';
import { BookingModel } from 'src/app/models/bookingModel';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-editstatusdialog',
  templateUrl: './editstatusdialog.component.html',
  styleUrls: ['./editstatusdialog.component.scss']
})
export class EditstatusdialogComponent {
  statuses: string[] = [
    'Submitted',
    'Invalid Values',
    'Cancelled',
    'Completed',
  ];

  selected: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: BookingModel) {
    console.log(data);
    this.selected = data.status;
  }


  updateStatus(){
    const app = initializeApp(environment.firebaseConfig);
    const db = getDatabase();
    this.data.status = this.selected;
    console.log(this.selected);
    console.log(this.data);
    update(ref(db, 'appointments/' + this.data.id), {
      status: this.selected,
    });
  }

}
