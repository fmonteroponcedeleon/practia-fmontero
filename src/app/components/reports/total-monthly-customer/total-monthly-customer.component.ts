import { Component, OnInit } from '@angular/core';

import { BusinessService } from 'src/app/services/business.service';
import { ToastrService } from 'ngx-toastr';

import { Customer } from 'src/app/models/customer';
import { Service } from 'src/app/models/service';
import { ServiceCustomer } from 'src/app/models/service-customer';
import { TotalMonthlyCustomer } from 'src/app/models/total-monthly-customer';

@Component({
  selector: 'app-total-monthly-customer',
  templateUrl: './total-monthly-customer.component.html',
  styleUrls: ['./total-monthly-customer.component.css']
})
export class TotalMonthlyCustomerComponent implements OnInit {

  public customers: Customer[] = [];
  public services: Service[] = [];
  public servicesCustomers: ServiceCustomer[] = [];
  public totalMonthlyCustomers: TotalMonthlyCustomer[] = [];

  public isLoadingCustomers = false;
  public isLoadingServices = false;
  public isLoadingServiceCustomers = false;

  public sortPropPosted = 'fullName';
  public sortReversePosted = false;

  public term: string;

  constructor(
    private businessService: BusinessService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getCustomers();
    this.getServices();
    this.getServiceCustomer();
  }

  /**
   * Responsible to retrieve the customers
   */
  getCustomers(): void {
    this.isLoadingCustomers = true;
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
        this.isLoadingCustomers = false;
        if (this.isLoadingFinished()) {
          this.calculateTotalMonthlyAmountPerCustomer();
        }
      },
      error => {
        this.isLoadingCustomers = false;
        this.toastr.error('Se produjo un error y no se pudieron recuperar los clientes');
      }
    );
  }

  /**
   * Responsible to retrieve the services
   */
  getServices(): void {
    this.isLoadingServices = true;
    this.businessService.getServices().subscribe(
      (serviceResult: any[]) => {
        this.services = serviceResult.map((s: any) => {
          return {
            id: s.id,
            name: s.nombre,
            monthlyFee: s.cuotaMensual
          };
        });
        this.isLoadingServices = false;
        if (this.isLoadingFinished()) {
          this.calculateTotalMonthlyAmountPerCustomer();
        }
      },
      error => {
        this.isLoadingServices = false;
        this.toastr.error('Se produjo un error y no se pudieron recuperar los servicios');
      }
    );
  }

  /**
   * Responsible to retrieve the associations between services and customers
   */
  getServiceCustomer(): void {
    this.isLoadingServiceCustomers = true;
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
        this.isLoadingServiceCustomers = false;
        if (this.isLoadingFinished()) {
          this.calculateTotalMonthlyAmountPerCustomer();
        }
      },
      error => {
        this.isLoadingServiceCustomers = false;
        this.toastr.error('Se produjo un error y no se pudieron recuperar los servicios');
      }
    );
  }

  /**
   * Check if the loaders finished
   */
  isLoadingFinished(): boolean {
    return !this.isLoadingCustomers && !this.isLoadingServices
      && !this.isLoadingServiceCustomers ? true : false;
  }

  /**
   * Responsible to calculate the total monthly amount per customer
   */
  calculateTotalMonthlyAmountPerCustomer(): void {
    for (let i = 0; i < this.customers.length; i++) {
      for (let j = 0; j < this.servicesCustomers.length; j++) {
        if (this.customers[i].id === this.servicesCustomers[j].customerId) {
          let serviceCustomer = this.servicesCustomers[j];
          let service = this.services.find(s => s.id === serviceCustomer.serviceId);
          let serviceMonthlyFee = !!service ? service.monthlyFee : 0;

          // TODO: Isolate with new function!
          let totalMonthlyCustomer = this.totalMonthlyCustomers.find(
            tmc => tmc.customerId === serviceCustomer.customerId
              && tmc.month === new Date(serviceCustomer.dateOfAssociation).getMonth() + 1
              && tmc.year === new Date(serviceCustomer.dateOfAssociation).getFullYear());

          if (!!totalMonthlyCustomer) {
            totalMonthlyCustomer.totalAmount = totalMonthlyCustomer.totalAmount + serviceMonthlyFee;
          } else {
            totalMonthlyCustomer = new TotalMonthlyCustomer();
            totalMonthlyCustomer.customerId = this.customers[i].id;
            totalMonthlyCustomer.fullName = this.customers[i].fullName;
            totalMonthlyCustomer.documentNumber = this.customers[i].documentNumber;
            totalMonthlyCustomer.totalAmount = serviceMonthlyFee;
            totalMonthlyCustomer.month = new Date(serviceCustomer.dateOfAssociation).getMonth() + 1;
            totalMonthlyCustomer.year = new Date(serviceCustomer.dateOfAssociation).getFullYear();
            this.totalMonthlyCustomers.push(totalMonthlyCustomer);
          }
        }
      }
    }
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
