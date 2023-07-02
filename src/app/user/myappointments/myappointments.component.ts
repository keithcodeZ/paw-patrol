import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import { child, get, getDatabase, onValue, ref } from 'firebase/database';
import { BookingModel } from 'src/app/models/bookingModel';
import { ViewappointmentdialogComponent } from './viewappointmentdialog/viewappointmentdialog.component';
import { EditappointmentdialogComponent } from './editappointmentdialog/editappointmentdialog.component';
import { CancelappointmentdialogComponent } from './cancelappointmentdialog/cancelappointmentdialog.component';

@Component({
  selector: 'app-myappointments',
  templateUrl: './myappointments.component.html',
  styleUrls: ['./myappointments.component.scss']
})
export class MyappointmentsComponent implements OnInit{

  displayedColumns: string[] = ['service', 'date', 'total', 'specie', 'breed', 'status', 'action'];
  dataSource = new MatTableDataSource();
  bookingList: BookingModel[] = [];
  user : any;

  constructor(public dialog: MatDialog){

    this.dataSource.data = this.bookingList;
    this.readData();

  }

  ngOnInit(): void {
    
  }

  openEditDialog(i: number){
    const ref = this.dialog.open(EditappointmentdialogComponent, {
      data: this.bookingList[i]
    });
  }

  openViewDialog(i: number){
    console.log(this.bookingList[i]);

    const ref = this.dialog.open(ViewappointmentdialogComponent, {
      data: this.bookingList[i]
    });
  }

  openCancelDialog(i: number){
    const ref = this.dialog.open(CancelappointmentdialogComponent, {
      data: this.bookingList[i]
    });
  }

  readData(){
    var user: any = JSON.parse('' + localStorage.getItem('ppuser'));
    this.user = user;

    const app = initializeApp(environment.firebaseConfig);
    const db = getDatabase(app);
    const starCountRef = ref(db, 'appointments/');
    var appointment: BookingModel;

    onValue(starCountRef, (snapshot) => {
      console.log(snapshot.val());
      const data = snapshot.val();
      this.bookingList.splice(0,this.bookingList.length);
      snapshot.forEach((element) => {
        if (user.uid == element.val().uid) {
          console.log('NAGPROCEED SIYA DITO SA GETUSERDATA');
          console.log(element.val().uid);
          console.log('ETO YUNG LAMAN NUNG UID NA TO');
          console.log(element.val());

          appointment = element.val();

          console.log('ETO LAMAN NUNG APPOINTMENT');
          console.log(appointment);

          this.bookingList.push(appointment);


          // this.getUserData(element.val().uid,element.val());
        }


        // console.log('HELLASDASHDJKAHD');
        // console.log(child.val());
        // appointment = child.val();
        // this.bookingList.push(appointment);

        // const service = child.child('services').val()
        // console.log(this.servicesList);
        // console.log('ETO SAN TO BANDA HA');
        // this.servicesList.push(service);
        // this.dataSource.data = this.servicesList;
      });

      console.log('NAKAPUNTA SIYA DITO');

      this.dataSource.data = this.bookingList;

      console.log('ETO AFTER NIYA MA-EXECUTE');

      
    });

  }

  // getUserData(uid: string, appointment: BookingModel): any {
  //   console.log('NAKAPASOK NA SIYA SA GETUSERDATA');
  //   console.log(uid);
  //   console.log('LAMAN NG UID NA PINASA');
  //   console.log(appointment);
    

  //   const app = initializeApp(environment.firebaseConfig);

  //   get(child(ref(getDatabase()), `users/${uid}`))
  //     .then((snapshot) => {
  //       console.log('ETO ANO BA LAMAN NETO');
  //       //USER DETAILS
  //       console.log(snapshot.val());
  //       appointment.user = snapshot.val();
  //       this.bookingList.push(appointment);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });

  //     this.dataSource.data = this.bookingList;


  // }

}
