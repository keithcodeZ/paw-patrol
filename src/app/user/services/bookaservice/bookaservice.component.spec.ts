import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookaserviceComponent } from './bookaservice.component';

describe('BookaserviceComponent', () => {
  let component: BookaserviceComponent;
  let fixture: ComponentFixture<BookaserviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookaserviceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookaserviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
