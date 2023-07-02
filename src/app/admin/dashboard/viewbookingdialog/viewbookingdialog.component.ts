import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BookingModel } from 'src/app/models/bookingModel';

@Component({
  selector: 'app-viewbookingdialog',
  templateUrl: './viewbookingdialog.component.html',
  styleUrls: ['./viewbookingdialog.component.scss']
})
export class ViewbookingdialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: BookingModel){}

  ngOnInit(): void {
  }
}
