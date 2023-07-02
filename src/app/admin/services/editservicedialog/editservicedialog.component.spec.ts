import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditservicedialogComponent } from './editservicedialog.component';

describe('EditservicedialogComponent', () => {
  let component: EditservicedialogComponent;
  let fixture: ComponentFixture<EditservicedialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditservicedialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditservicedialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
