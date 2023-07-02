import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditstatusdialogComponent } from './editstatusdialog.component';

describe('EditstatusdialogComponent', () => {
  let component: EditstatusdialogComponent;
  let fixture: ComponentFixture<EditstatusdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditstatusdialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditstatusdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
