import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ToastrModule } from 'ngx-toastr';

import { BusinessService } from 'src/app/services/business.service';
import { BusinessMockService } from 'src/app/services/business-mock.service';

import { ServiceCustomerComponent } from './service-customer.component';

describe('ServiceCustomerComponent', () => {
  let component: ServiceCustomerComponent;
  let fixture: ComponentFixture<ServiceCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ServiceCustomerComponent
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
        FormsModule,
        ToastrModule.forRoot(),
      ],
      providers: [
        {
          provide: BusinessService,
          useClass: BusinessMockService
        },
      ]
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
