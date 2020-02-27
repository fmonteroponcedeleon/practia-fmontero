import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { OrderModule } from 'ngx-order-pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ToastrModule } from 'ngx-toastr';

import { BusinessService } from 'src/app/services/business.service';
import { BusinessMockService } from 'src/app/services/business-mock.service';

import { TotalMonthlyCustomerComponent } from './total-monthly-customer.component';

describe('TotalMonthlyCustomerComponent', () => {
  let component: TotalMonthlyCustomerComponent;
  let fixture: ComponentFixture<TotalMonthlyCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TotalMonthlyCustomerComponent
      ],
      imports: [
        HttpClientTestingModule,
        FormsModule,
        OrderModule,
        Ng2SearchPipeModule,
        ToastrModule.forRoot()
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
    fixture = TestBed.createComponent(TotalMonthlyCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
