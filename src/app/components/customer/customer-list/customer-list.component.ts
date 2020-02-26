import { Component, OnInit } from '@angular/core';

import { BusinessService } from '../../../services/business.service';

import { Customer } from '../../../models/customer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  public customers: Customer[] = [];

  public sortPropPosted = 'fullName';
  public sortReversePosted = false;

  public term: string;

  constructor(
    private businessService: BusinessService,
    private router: Router) { }

  ngOnInit(): void {
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
      },
      error => {
        // TODO: Handling error
      }
    );
  }

  /*
	 * Routes to the details of the customer selected.
	 */
  getCustomerDetails(customer: Customer): void {
    this.router.navigate(['/customer/' + customer.id]);
  }

  /**
   * Routes to the new customer component.
   */
  createCustomer(): void {
    this.router.navigate(['/customer/new']);
  }

  editCustomer(customer: Customer) {
    this.router.navigate(['/customer/edit/' + customer.id]);
  }

  sortTypePosted(name: string): void {
    this.sortReversePosted = this.sortPropPosted === name ? !this.sortReversePosted : false;
    this.sortPropPosted = name;
  }
}
