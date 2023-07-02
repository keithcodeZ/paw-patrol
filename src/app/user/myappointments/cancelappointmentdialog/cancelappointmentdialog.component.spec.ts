import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelappointmentdialogComponent } from './cancelappointmentdialog.component';

describe('CancelappointmentdialogComponent', () => {
  let component: CancelappointmentdialogComponent;
  let fixture: ComponentFixture<CancelappointmentdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancelappointmentdialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CancelappointmentdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
