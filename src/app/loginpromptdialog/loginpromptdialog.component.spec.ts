import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginpromptdialogComponent } from './loginpromptdialog.component';

describe('LoginpromptdialogComponent', () => {
  let component: LoginpromptdialogComponent;
  let fixture: ComponentFixture<LoginpromptdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginpromptdialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginpromptdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
