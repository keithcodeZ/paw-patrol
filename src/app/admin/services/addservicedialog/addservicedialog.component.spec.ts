import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddservicedialogComponent } from './addservicedialog.component';

describe('AddservicedialogComponent', () => {
  let component: AddservicedialogComponent;
  let fixture: ComponentFixture<AddservicedialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddservicedialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddservicedialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
