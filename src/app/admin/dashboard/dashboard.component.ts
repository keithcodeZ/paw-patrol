import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import { child, get, getDatabase, onValue, ref } from 'firebase/database';
import { BookingModel } from 'src/app/models/bookingModel';
import { EditstatusdialogComponent } from './editstatusdialog/editstatusdialog.component';
import { ViewbookingdialogComponent } from './viewbookingdialog/viewbookingdialog.component';
import { jsPDF } from 'jspdf';
import { FilterdialogComponent } from './filterdialog/filterdialog.component';
import Chart from 'chart.js/auto';
import {
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
} from 'chart.js';
import { serviceModel } from 'src/app/models/servicesList';
import { LiveAnnouncer } from '@angular/cdk/a11y';
Chart.register(LineController, LineElement, PointElement, LinearScale, Title);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['name', 'service', 'location', 'date', 'total', 'specie', 'breed', 'status', 'action'];
  dataSource = new MatTableDataSource();
  bookingList: BookingModel[] = [];
  bookingListTemp: BookingModel[] = [];
  user : any;

  filterDate1: any;
  filterDate2: any;
  filterType: any;

  serviceCount: number = 0;
  serviceList: serviceModel[]=[];

  fullGroom: number = 0;
  nailTrim: number = 0;
  earClean: number = 0;
  bath: number = 0;

  myChart: Chart;
  myChart2: Chart;
  // myChart3: Chart;

  constructor(private _liveAnnouncer: LiveAnnouncer, public dialog: MatDialog){

    this.dataSource.data = this.bookingList;
    

  }
  ngAfterViewInit(){
    // this.displayChart();
    this.readData();
  }

  ngOnInit(): void {
    
  }

  openFilterDialog(){
    const ref = this.dialog.open(FilterdialogComponent, {
      data: {
        filterDate1: this.filterDate1,
        filterDate2: this.filterDate2,
        filterType: this.filterType,
      },
    });

    ref.afterClosed().subscribe((data) => {
      console.log(data);
      if (data == 'clear') {
        this.bookingList = this.bookingListTemp;
        this.dataSource.data = this.bookingList;

        this.filterDate1 = undefined;
        this.filterDate2 = undefined;
        this.filterType = undefined;
      } else {
        this.filterDate1 = data.filterDate1;
        this.filterDate2 = data.filterDate2;
        this.filterType = data.filterType;
        this.generateReport();
      }
    }); 
  }

  generateReport(){
    var sdate = new Date(this.filterDate1);
    var edate = new Date(this.filterDate2);

    var dates = this.getDatesInRange(sdate, edate);
    var generatedReport: BookingModel[] = [];

    this.bookingListTemp.forEach((booking) => {
      if (this.filterDate1 != undefined && this.filterDate2 != undefined) {
        if (this.getSpecificReport(dates, booking) != null) {
          generatedReport.push(this.getSpecificReport(dates, booking));
        }
      } else {
        if (this.filterType == booking.serviceName) {
          generatedReport.push(booking);
        }
      }
    });

    console.log(generatedReport);
    this.bookingList = generatedReport;
    this.dataSource.data = this.bookingList;

  }

  getDatesInRange(startDate: Date, endDate: Date){

    const date = new Date(startDate.getTime());

    const dates = [];

    while (date <= endDate) {
      dates.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }

    return dates;
  }

  getSpecificReport(date: Date[], booking: BookingModel){
    for (var i = 0; i < date.length; i++) {
      if (this.filterType != undefined) {
        if (
          date[i].toLocaleDateString() == booking.date &&
          booking.serviceName == this.filterType
        ) {
          console.log(date[i].toLocaleDateString() + ' == ' + booking.date);
          console.log(date);
          return booking;
        }
      } else {
        if (date[i].toLocaleDateString() == booking.date) {
          console.log(date[i].toLocaleDateString() + ' == ' + booking.date);
          console.log(date);
          return booking;
        }
      }
    }

    return null as any;
  }

  downloadAll(){
    for (var i = 0; i < this.bookingList.length; i++) {
      var doc = new jsPDF();

      doc.setFontSize(30);
      doc.text('' + this.bookingList[i].serviceName + ' Appointment', 10, 25);

      doc.setFontSize(12);
      doc.text('Customer Name: ' + this.bookingList[i].userName, 10, 40);
      doc.text('Service Availed: ' + this.bookingList[i].serviceName, 10, 50);
      doc.text('Date Created: ' + this.bookingList[i].dateCreated, 10, 60);
      doc.text('Date of Booking: ' + this.bookingList[i].date, 10, 70);
      doc.text('Address/Location: ' + this.bookingList[i].address, 10, 80);
      doc.text('Total: ' + this.bookingList[i].price, 10, 90);

      doc.text('PET INFORMATION: ', 10, 110);
      doc.text('Specie: ' + this.bookingList[i].petSpecies, 10, 120);
      doc.text('Breed: ' + this.bookingList[i].petBreed, 10, 130);
      doc.text('Age: ' + this.bookingList[i].petAge, 10, 140);
      doc.text('Gender: ' + this.bookingList[i].petGender, 10, 150);
      doc.text('Weight (kg): ' + this.bookingList[i].petWeight, 10, 160);

      doc.save(this.bookingList[i].id);

    }
    
  }

  downloadAppointment(i: number){
    var booking: BookingModel = this.bookingList[i];
    var doc = new jsPDF();

    doc.setFontSize(30);
    doc.text('' + booking.serviceName + ' Appointment', 10, 25);
    doc.setFontSize(12);

    doc.text('Customer Name: ' + booking.userName, 10, 45);
    doc.text('Service Availed: ' + booking.serviceName, 10, 55);
    doc.text('Date Created: ' + booking.dateCreated, 10, 65);
    doc.text('Date of Booking: ' + booking.date, 10, 75);
    doc.text('Address/Location: ' + booking.address, 10, 85);
    doc.text('Total: ' + booking.price + 'PHP', 10, 95);

    doc.text('PET INFORMATION: ', 10, 110);
    doc.text('Specie: ' + booking.petSpecies, 10, 120);
    doc.text('Breed: ' + booking.petBreed, 10, 130);
    doc.text('Age: ' + booking.petAge, 10, 140);
    doc.text('Gender: ' + booking.petGender, 10, 150);
    doc.text('Weight (kg): ' + booking.petWeight, 10, 160);

    doc.save(booking.id);
  }

  displayChart(){
    
    this.myChart = new Chart('myChart', {
      type: 'bar',
      data: {
        labels: [
          'Denial of service',
          'Sexual Assault',
          'Verbal Abuse',
          'Physical Violence',
        ],
        datasets: [
          {
            label: 'Incident count',
            data: [this.fullGroom, this.nailTrim, this.earClean, this.bath],
            //backgroundColor: utils.transparentize(utils.CHART_COLORS.red, 0.5),
            backgroundColor: [
              'rgb(175, 185, 255)',
              'rgb(133, 92, 248)',
              'rgb(142, 68, 173)',
              'rgb(255, 205, 86)',
            ],
            //borderColor: utils.CHART_COLORS.red,
            borderWidth: 1,
            borderColor: 'rgb(75, 192, 192)',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
      
    });

    this.myChart2 = new Chart('myChart2', {
      type: 'line',
      data: {
        labels: [
          'Denial of service',
          'Sexual Assault',
          'Verbal Abuse',
          'Physical Violence',
        ],
        datasets: [
          {
            label: 'Incident count',
            data: [this.fullGroom, this.nailTrim, this.earClean, this.bath],
            //backgroundColor: utils.transparentize(utils.CHART_COLORS.red, 0.5),
            backgroundColor: [
              'rgb(175, 185, 255)',
              'rgb(133, 92, 248)',
              'rgb(142, 68, 173)',
              'rgb(255, 205, 86)',
            ],
            //borderColor: utils.CHART_COLORS.red,
            borderWidth: 1,
            borderColor: 'rgb(75, 192, 192)',
          },
        ],
      },
      options: {
        animations: {
          tension: {
            duration: 1000,
            easing: 'linear',
            from: 1,
            to: 0,
            loop: true,
          },
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            min: 0,
          },
        },
      },
    });

    // this.myChart3 = new Chart('myChart3', {
    //   type: 'pie',
    //   data: {
    //     labels: [
    //       'Denial of service',
    //       'Sexual Assault',
    //       'Verbal Abuse',
    //       'Physical Violence',
    //     ],
    //     datasets: [
    //       {
    //         label: 'Incident count',
    //         data: [this.fullGroom, this.nailTrim, this.earClean, this.bath],
    //         //backgroundColor: utils.transparentize(utils.CHART_COLORS.red, 0.5),
    //         backgroundColor: [
    //           'rgb(175, 185, 255)',
    //           'rgb(133, 92, 248)',
    //           'rgb(142, 68, 173)',
    //           'rgb(255, 205, 86)',
    //         ],
    //         //borderColor: utils.CHART_COLORS.red,
    //         borderWidth: 1,
    //         borderColor: 'rgb(75, 192, 192)',
    //       },
    //     ],
    //   },
    //   options: {
    //     animations: {
    //       tension: {
    //         duration: 1000,
    //         easing: 'linear',
    //         from: 1,
    //         to: 0,
    //         loop: true,
    //       },
    //     },
    //     responsive: true,
    //     maintainAspectRatio: false,
    //     scales: {
    //       y: {
    //         beginAtZero: true,
    //         min: 0,
    //       },
    //     },
    //   },
    // });

  }

  readData(){
    this.displayChart();
    const app = initializeApp(environment.firebaseConfig);
    const db = getDatabase(app);

    const starCountRef = ref(db, 'appointments/');
    var appointment: BookingModel;

    onValue(starCountRef, (snapshot) => {
      this.fullGroom = 0;
      this.nailTrim = 0;
      this.earClean = 0;
      this.bath = 0;

      // var lengthOfAppointments: number = 0;

      // const perService = snapshot.val();
      // console.log('ANO BA LAMAN NETO');
      // console.log(perService.length);
      this.bookingList.splice(0,this.bookingList.length);

      //0 VALUE NETO
      // console.log(this.bookingList.length);

      snapshot.forEach((child) => {
        const data = child.val();
        
        console.log('ETO YUNG DATA SA BABA');
        console.log(data);
        appointment = child.val();
        this.bookingList.push(appointment);

        switch (data.serviceName.toString().toLowerCase()) {
          case 'Full Grooming'.toLowerCase():
            this.fullGroom += 1;
            break;
          case 'Nail Trimming'.toLowerCase():
              this.nailTrim += 1;
            break;
          case 'Ear Cleaning'.toLowerCase():
              this.earClean += 1;
            break;
          case 'Bathing'.toLowerCase():
              this.bath += 1;
          break;
        }

        this.reDrawChart();

        // lengthOfAppointments += 1;
        // console.log(lengthOfAppointments);
        });

      this.dataSource.data = this.bookingList;
      this.bookingListTemp = this.bookingList;

    });

    // var serviceStorage: any[] = [];
    // var service: any;
    

    //READING SERVICES
    // const dbref = ref(db, 'services/');
    // onValue(dbref, (snapshot) => {
    //   this.serviceList.splice(0,this.serviceList.length);

    //   snapshot.forEach((child) => {
    //     this.serviceList.push(child.val());
    //     localStorage.setItem('servicesLocal', JSON.stringify(this.serviceList));
    //   });

      

    //   for (var i = 0; i < this.serviceList.length; i++) {
    //     console.log('NAKAPASOK NG FOR LOOP');
    //     // serviceStorage[i] = this.serviceList[i].title;
    //     serviceStorage[i] = 0;
    //     console.log('RESULTA BAWAT LUSOT');
    //     console.log(serviceStorage);
    //     console.log(serviceStorage[i]);

    //   }

    //   console.log('FINAL NAKALABAS NA NG FOR LOOP');
    //   console.log(serviceStorage);

    //   return serviceStorage;
      
    // });

    //READING APPOINTMENTS
    


        //ASSIGNING COUNT PER APPOINTMENT OCCURED
      // var i: number = 0;
      // var services: any = JSON.parse(""+ localStorage.getItem('servicesLocal'))

      // console.log (services);

      // snapshot.forEach((child) => {
        // var services: any = JSON.parse(""+ localStorage.getItem('servicesLocal'))

        // console.log (services.title);

        // // console.log ('value ng i pagpasok');
        // // console.log (i);
      
        // const data = child.val();

        // if (services.title == this.bookingList[i].serviceName){
        //   serviceStorage[i] =+ 1;
        //   console.log(serviceStorage)
        // }

        // console.log(data.serviceName.toString().toLowerCase());

        // console.log(this.bookingList[i].serviceName.toLowerCase());

        // i = i + 1;
        // console.log (i);

        

        // switch(data.serviceName.toString().toLowerCase()){
          
        //   case this.bookingList[i].serviceName.toLowerCase():
        //     console.log(this.bookingList[i].serviceName.toLowerCase());
        //     serviceStorage[i] =+ 1;
        //     console.log(serviceStorage[i]);
        //     break;
          
        //   case this.bookingList[i].serviceName.toLowerCase():
        //     console.log(this.bookingList[i].serviceName.toLowerCase());
        //     serviceStorage[i] = +serviceStorage[i] + +1;
        //     console.log(serviceStorage[i]);
        //     break;

        //     case this.bookingList[i].serviceName.toLowerCase():
        //       console.log(this.bookingList[i].serviceName.toLowerCase());
        //       serviceStorage[i] =+ 1;
        //       console.log(serviceStorage[i]);
        //       break;

        // }

        // i = i + 1;
        // console.log ('Value of i after switch');
        // console.log (i);
        

        // console.log(lengthOfAppointments);
        // for (var i = 0; i < data.length; i++) {
        //   console.log(data.serviceName.toString().toLowerCase());

        // console.log(this.bookingList[i].serviceName);
        // console.log('LAMAN NG SERVICE STORAGE SA BABA');
        // console.log(serviceStorage[i] += 1);
        // switch (data.serviceName.toString().toLowerCase()) {
        //   case data.serviceName[i].toLowerCase():
        //     console.log('NAKAPASOK KA BA DITO');
        //     serviceStorage[i] += 1;
        //     break;

        // }

        // }
      // }); 

  } // END OF READDATA

  reDrawChart(){

    //destroy all chart first
    this.myChart.destroy();
    this.myChart2.destroy();
    // this.myChart3.destroy();

    this.myChart = new Chart('myChart', {
      type: 'bar',
      data: {
        labels: [
          'Full Grooming',
          'Nail Trimming',
          'Ear Cleaning',
          'Bathing',
        ],
        datasets: [
          {
            label: 'Services Availed',
            data: [this.fullGroom, this.nailTrim, this.earClean, this.bath],
            //backgroundColor: utils.transparentize(utils.CHART_COLORS.red, 0.5),
            backgroundColor: [
              'rgb(175, 185, 255)',
              // 'rgb(133, 92, 248)',
              // 'rgb(142, 68, 173)',
              // 'rgb(255, 205, 86)',
            ],
            //borderColor: utils.CHART_COLORS.red,
            borderWidth: 1,
            borderColor: 'rgb(75, 192, 192)',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    this.myChart2 = new Chart('myChart2', {
      type: 'line',
      data: {
        labels: [
          'Full Grooming',
          'Nail Trimming',
          'Ear Cleaning',
          'Bathing',
        ],
        datasets: [
          {
            label: 'Services Availed',
            data: [this.fullGroom, this.nailTrim, this.earClean, this.bath],
            //backgroundColor: utils.transparentize(utils.CHART_COLORS.red, 0.5),
            backgroundColor: [
              'rgb(175, 185, 255)',
              // 'rgb(133, 92, 248)',
              // 'rgb(142, 68, 173)',
              // 'rgb(255, 205, 86)',
            ],
            //borderColor: utils.CHART_COLORS.red,
            borderWidth: 1,
            borderColor: 'rgb(75, 192, 192)',
          },
        ],
      },
      options: {
        animations: {
          tension: {
            duration: 1000,
            easing: 'linear',
            from: 1,
            to: 0,
            loop: true,
          },
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            min: 0,
          },
        },
      },
    });

    // this.myChart3 = new Chart('myChart3', {
    //   type: 'pie',
    //   data: {
    //     labels: [
    //       'Denial of service',
    //       'Sexual Assault',
    //       'Verbal Abuse',
    //       'Physical Violence',
    //     ],
    //     datasets: [
    //       {
    //         label: 'Incident count',
    //         data: [this.fullGroom, this.nailTrim, this.earClean, this.bath],
    //         //backgroundColor: utils.transparentize(utils.CHART_COLORS.red, 0.5),
    //         backgroundColor: [
    //           'rgb(175, 185, 255)',
    //           'rgb(133, 92, 248)',
    //           'rgb(142, 68, 173)',
    //           'rgb(255, 205, 86)',
    //         ],
    //         //borderColor: utils.CHART_COLORS.red,
    //         borderWidth: 1,
    //         borderColor: 'rgb(75, 192, 192)',
    //       },
    //     ],
    //   },
    //   options: {
    //     animations: {
    //       tension: {
    //         duration: 1000,
    //         easing: 'linear',
    //         from: 1,
    //         to: 0,
    //         loop: true,
    //       },
    //     },
    //     responsive: true,
    //     maintainAspectRatio: false,
    //     scales: {
    //       y: {
    //         beginAtZero: true,
    //         min: 0,
    //       },
    //     },
    //   },
    // });

  }

  openEditStatusDialog(i: number){
    const ref = this.dialog.open(EditstatusdialogComponent, {
      data: this.bookingList[i]
    });
  }

  openViewDialog(i: number){
    const ref = this.dialog.open(ViewbookingdialogComponent, {
      data: this.bookingList[i]
    });
  }

  



}
