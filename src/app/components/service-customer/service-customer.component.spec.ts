import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceCustomerComponent } from './service-customer.component';

describe('ServiceCustomerComponent', () => {
  let component: ServiceCustomerComponent;
  let fixture: ComponentFixture<ServiceCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
