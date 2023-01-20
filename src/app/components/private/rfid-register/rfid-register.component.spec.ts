import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RfidRegisterComponent } from './rfid-register.component';

describe('RfidRegisterComponent', () => {
  let component: RfidRegisterComponent;
  let fixture: ComponentFixture<RfidRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RfidRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RfidRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
