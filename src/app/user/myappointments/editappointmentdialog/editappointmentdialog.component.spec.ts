import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditappointmentdialogComponent } from './editappointmentdialog.component';

describe('EditappointmentdialogComponent', () => {
  let component: EditappointmentdialogComponent;
  let fixture: ComponentFixture<EditappointmentdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditappointmentdialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditappointmentdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
