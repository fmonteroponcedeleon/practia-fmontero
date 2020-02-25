import { Component, OnInit } from '@angular/core';

import { BusinessService } from 'src/app/services/business.service';

import { Customer } from 'src/app/models/customer';
import { ServiceCustomer } from 'src/app/models/service-customer';
import { TotalMonthlyCustomer } from 'src/app/models/total-monthly-customer';

@Component({
  selector: 'app-total-monthly-customer',
  templateUrl: './total-monthly-customer.component.html',
  styleUrls: ['./total-monthly-customer.component.css']
})
export class TotalMonthlyCustomerComponent implements OnInit {

  public customers: Customer[] = [];
  public servicesCustomers: ServiceCustomer[] = [];
  public totalMonthlyCustomers: TotalMonthlyCustomer[] = [];

  constructor(private businessService: BusinessService) { }

  ngOnInit() {
    this.getCustomers();
    this.getServiceCustomer();
  }

  getCustomers(): void {
    this.businessService.getCustomers().subscribe(
      (serviceResult: any[]) => {
        this.customers = serviceResult.map((c: any) => {
          return {
            id: c.id,
            fullName: c.nombreCompleto,
            documentNumber: c.cedula,
            address: c.direccion,
            phone: c.telefono,
            dateOfBirth: c.fechaNacimiento
          };
        });
        console.log('customers', this.customers);
      },
      error => {
        // TODO: Handling error
      }
    );
  }

  getServiceCustomer(): void {
    this.businessService.getServiceCustomer().subscribe(
      (serviceResultGet: any) => {
        this.servicesCustomers = serviceResultGet.map((sc: any) => {
          return {
            id: sc.id,
            customerId: sc.clienteId,
            serviceId: sc.servicioId,
            dateOfAssociation: sc.fechaAsociado
          };
        });
        console.log('serviceCustomers', this.servicesCustomers);
      },
      error => {
        // TODO: Handling error
      }
    );
  }

  calculateTotalMonthlyAmountPerCustomer(): void {
    
    

  }
}
