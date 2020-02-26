import { Component, OnInit } from '@angular/core';

import { BusinessService } from '../../../services/business.service';
import { ToastrService } from 'ngx-toastr';

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
    private router: Router,
    private toastr: ToastrService) { }

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
        this.toastr.error('Se produjo un error y no se pudieron recuperar los clientes');
      }
    );
  }

  /**
   * Routes to details of selected customer
   * @param customer selected
   */
  getCustomerDetails(customer: Customer): void {
    this.router.navigate(['/customer/' + customer.id]);
  }

  /**
   * Routes to the new customer view
   */
  createCustomer(): void {
    this.router.navigate(['/customer/new']);
  }

  /**
   * Routes to the edit customer view with specific customer
   * @param customer to edit
   */
  editCustomer(customer: Customer) {
    this.router.navigate(['/customer/edit/' + customer.id]);
  }

  /**
   * Responsible to mange the sorting information
   * @param name to sort
   */
  sortTypePosted(name: string): void {
    this.sortReversePosted = this.sortPropPosted === name ? !this.sortReversePosted : false;
    this.sortPropPosted = name;
  }
}
