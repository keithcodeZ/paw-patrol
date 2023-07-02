import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmdeletedialogComponent } from './confirmdeletedialog.component';

describe('ConfirmdeletedialogComponent', () => {
  let component: ConfirmdeletedialogComponent;
  let fixture: ComponentFixture<ConfirmdeletedialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmdeletedialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmdeletedialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
