import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import { getDatabase, ref, onValue, set , push} from 'firebase/database';
import { serviceModel } from 'src/app/models/servicesList';
import { AddservicedialogComponent } from './addservicedialog/addservicedialog.component';
import { EditservicedialogComponent } from './editservicedialog/editservicedialog.component';
import { ConfirmdeletedialogComponent } from './confirmdeletedialog/confirmdeletedialog.component';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  displayedColumns: string[] = ['title', 'description', 'price', 'action'];
  // dataSource = serviceModel;
  dataSource = new MatTableDataSource();
  servicesList: serviceModel[] = [];

  constructor(public dialog: MatDialog){

    this.dataSource.data = this.servicesList
    this.readData();

  }

  ngOnInit(): void {
    
  }

  openAddDialog(){
    this.dialog.open(AddservicedialogComponent);
  }

  openEditDialog(i: number) {
    console.log(i);
    const ref = this.dialog.open(EditservicedialogComponent, {
      data: this.servicesList[i],
    });
  }

  readData(){
    const app = initializeApp(environment.firebaseConfig);
    const db = getDatabase(app);
    const starCountRef = ref(db, 'services/');
    var service: serviceModel;
    onValue(starCountRef, (snapshot) => {
      console.log(snapshot.val());
      const data = snapshot.val();
      this.servicesList.splice(0,this.servicesList.length)
      snapshot.forEach((child) => {
        console.log('HELLASDASHDJKAHD');
        console.log(child.val());
        service = child.val();
        this.servicesList.push(service);

        // const service = child.child('services').val()
        // console.log(this.servicesList);
        // console.log('ETO SAN TO BANDA HA');
        // this.servicesList.push(service);
        // this.dataSource.data = this.servicesList;
      });

      this.dataSource.data = this.servicesList;
    });

  }

  deleteService(i: number){
    const dialogRef = this.dialog.open(ConfirmdeletedialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result =='yes'){
        var service: serviceModel;
        const app = initializeApp(environment.firebaseConfig);
        const database = getDatabase();
        set(ref(database, 'services/' + this.servicesList[i].uid), null);
      }
    })

  }

}

var ELEMENT_DATA: serviceModel[] = [
  // {
  //   id: 'id',
  //   isPin: false,
  //   imgUrl: '',
  //   title: 'title',
  //   description: '',
  //   telephone: '',
  //   phone: '',
  //   email: '',
  //   bank: '',
  //   gcash: '',
  //   datecreated: 'date created',
  // },
];
