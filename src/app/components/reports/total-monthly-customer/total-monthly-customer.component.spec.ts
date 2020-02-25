import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalMonthlyCustomerComponent } from './total-monthly-customer.component';

describe('TotalMonthlyCustomerComponent', () => {
  let component: TotalMonthlyCustomerComponent;
  let fixture: ComponentFixture<TotalMonthlyCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalMonthlyCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalMonthlyCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
