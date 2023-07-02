import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-loginpromptdialog',
  templateUrl: './loginpromptdialog.component.html',
  styleUrls: ['./loginpromptdialog.component.scss']
})
export class LoginpromptdialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: string){

  }

  ngOnInit(): void {
    
  }

}
