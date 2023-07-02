import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import { getDatabase, ref, set, update } from 'firebase/database';
import { BookingModel } from 'src/app/models/bookingModel';

@Component({
  selector: 'app-editappointmentdialog',
  templateUrl: './editappointmentdialog.component.html',
  styleUrls: ['./editappointmentdialog.component.scss']
})
export class EditappointmentdialogComponent implements OnInit  {

  date: string;
  time: string;
  address: string;
  status: string;
  petSpecies: string;
  petBreed: string;
  petAge: string;
  petGender: string;
  petWeight: string;

  statusType: string[] = [
    'Submitted',
    'Cancel'
  ]

  constructor(@Inject(MAT_DIALOG_DATA) public data: BookingModel){

    console.log('ETO YUNG DATA NA BOOKING LOADED');
    console.log(data);

    this.date = data.date;
    this.time = data.time;
    this.address = data.address;
    this.status = data.status;
    this.petSpecies = data.petSpecies;
    this.petBreed = data.petBreed;
    this.petAge = data.petAge;
    this.petGender = data.petGender;
    this.petWeight = data.petWeight;

  }

  ngOnInit(): void {
  }

  updateAppointment(){
    const app = initializeApp(environment.firebaseConfig);
    const db = getDatabase();

    this.data.date = this.date;
    this.data.time = this.time;
    this.data.address = this.address;
    this.data.petSpecies = this.petSpecies;
    this.data.petBreed = this.petBreed;
    this.data.petAge = this.petAge;
    this.data.petGender = this.petGender;
    this.data.petWeight = this.petWeight;

    update(ref(db, 'appointments/' + this.data.id), {
      date: this.date,
      time: this.time,
      address: this.address,
      petSpecies: this.petSpecies,
      petBreed: this.petBreed,
      petAge: this.petAge,
      petGender: this.petGender,
      petWeight: this.petWeight,
    });

  }

}
