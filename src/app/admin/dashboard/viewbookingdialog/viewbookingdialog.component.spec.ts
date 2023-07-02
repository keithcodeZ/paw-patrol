import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewbookingdialogComponent } from './viewbookingdialog.component';

describe('ViewbookingdialogComponent', () => {
  let component: ViewbookingdialogComponent;
  let fixture: ComponentFixture<ViewbookingdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewbookingdialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewbookingdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
