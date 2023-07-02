import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewappointmentdialogComponent } from './viewappointmentdialog.component';

describe('ViewappointmentdialogComponent', () => {
  let component: ViewappointmentdialogComponent;
  let fixture: ComponentFixture<ViewappointmentdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewappointmentdialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewappointmentdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
