import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BusinessService } from 'src/app/services/business.service';
import { ToastrService } from 'ngx-toastr';

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
    private router: Router,
    private toastr: ToastrService) { }

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
          this.toastr.error('Se produjo un error y no se pudo recuperar el detalle del cliente');
        }
      );

    });
  }

  /**
   * Delete a specific customer
   * @param customer to delete
   */
  deleteCustomer(customer: Customer): void {
    this.businessService.deleteCustomer(customer.id).subscribe(
      (serviceResult: string) => {
        this.toastr.success('Cliente eliminado con exito!');
        this.router.navigate(['/customers']);
      },
      error => {
        this.toastr.error('Se produjo un error y no se pudo eliminar el cliente');
      }
    );
  }

  /**
   * Back to the customer list view
   */
  back(): void {
    this.router.navigate(['/customers']);
  }
}
