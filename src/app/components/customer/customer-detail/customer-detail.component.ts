import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BusinessService } from 'src/app/services/business.service';

import { Customer } from 'src/app/models/customer';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {

  public customerId: number;
  public customer: Customer = new Customer();

  constructor(
    private route: ActivatedRoute,
    private businessService: BusinessService,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.customerId = params.id;
      this.businessService.getCustomerById(this.customerId).subscribe(
        (serviceResult: any) => {
          this.customer.id = serviceResult.id;
          this.customer.fullName = serviceResult.nombreCompleto;
          this.customer.documentNumber = serviceResult.cedula;
          this.customer.address = serviceResult.direccion;
          this.customer.phone = serviceResult.telefono;
          this.customer.dateOfBirth = serviceResult.fechaNacimiento;
        },
        error => {
          // TODO: Handling error
        }
      );

    });
  }

  deleteCustomer(customer: Customer): void {
    this.businessService.deleteCustomer(customer.id).subscribe(
      (serviceResult: string) => {
        this.router.navigate(['/customers']);
        // TODO: Toastr notification!
      },
      error => {
        // TODO: Handling error
      }
    );
  }

  back(): void {
    this.router.navigate(['/customers']);
  }
}
