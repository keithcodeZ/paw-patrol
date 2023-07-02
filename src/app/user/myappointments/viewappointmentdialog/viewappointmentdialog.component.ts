import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import { getDatabase, ref, set, update } from 'firebase/database';
import { BookingModel } from 'src/app/models/bookingModel';

@Component({
  selector: 'app-viewappointmentdialog',
  templateUrl: './viewappointmentdialog.component.html',
  styleUrls: ['./viewappointmentdialog.component.scss']
})
export class ViewappointmentdialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: BookingModel){}


  ngOnInit(): void {
  }

}
