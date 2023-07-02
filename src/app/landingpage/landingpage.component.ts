import { Component } from '@angular/core';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss']
})
export class LandingpageComponent {

  toAboutUs(){
    document.getElementById("aboutus")?.scrollIntoView();
  }
}
