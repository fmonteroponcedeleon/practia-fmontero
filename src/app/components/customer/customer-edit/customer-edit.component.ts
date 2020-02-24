import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { BusinessService } from 'src/app/services/business.service';

import { Customer } from 'src/app/models/customer';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {

  public customerId: number;
  public customer: Customer = new Customer();

  constructor(
    private businessService: BusinessService,
    private router: Router,
    private route: ActivatedRoute) { }

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

  onSubmit() {
    this.businessService.editCustomer(this.customer).subscribe(
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
