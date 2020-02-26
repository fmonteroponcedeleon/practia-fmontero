import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BusinessService } from 'src/app/services/business.service';
import { ToastrService } from 'ngx-toastr';

import { Customer } from 'src/app/models/customer';
import { Service } from 'src/app/models/service';
import { Operation } from 'src/app/models/operation';
import { ServiceCustomer } from 'src/app/models/service-customer';

@Component({
  selector: 'app-service-customer',
  templateUrl: './service-customer.component.html',
  styleUrls: ['./service-customer.component.css']
})
export class ServiceCustomerComponent implements OnInit {

  public operations = Operation;
  public services: Service[] = [];
  public customers: Customer[] = [];
  public servicesCustomers: ServiceCustomer[] = [];

  public selectedOperation: number;
  public selectedService: Service;
  public selectedCustomer: Customer;

  constructor(
    private businessService: BusinessService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getServices();
    this.getCustomers();
  }

  /**
   * Retrieves the available services
   */
  getServices(): void {
    this.businessService.getServices().subscribe(
      (serviceResult: Service[]) => {
        this.services = serviceResult.map((s: any) => {
          return {
            id: s.id,
            name: s.nombre,
            monthlyFee: s.cuotaMensual
          };
        });
      },
      error => {
        this.toastr.error('Se produjo un error y no se pudieron recuperar los servicios');
      }
    );
  }

  /**
   * Retrieves the available customers
   */
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
      },
      error => {
        this.toastr.error('Se produjo un error y no se pudieron recuperar los clientes');
      }
    );
  }

  /**
   * Responsible to associate a service with a customer
   */
  associateServiceCustomer(): void {
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
        const serviceCustomerExistent = this.isServiceCustomerExist();
        if (!!serviceCustomerExistent) {
          if (this.selectedOperation === this.operations.Disassociate) {
            this.businessService.desassociateServiceCustomer(serviceCustomerExistent.id).subscribe(
              (serviceResultDesassociate: any) => {
                this.toastr.success('Desvinculación exitosa!');
              }
            );
          } else {
            this.toastr.error('Este servicio ya se encuentra vinculado a este cliente!');
          }
        } else {
          if (this.selectedOperation === this.operations.Associate) {
            const today = new Date();
            this.businessService.associateServiceCustomer(this.selectedService.id, this.selectedCustomer.id, today).subscribe(
              (serviceResultAssociate: any) => {
                this.toastr.success('Asociación exitosa!');
              }
            );
          } else {
            this.toastr.info('Nada para desvincular! Actualmente este servicio no esta vinculado a este cliente');
          }
        }
      }
    );
  }

  /**
   * Validate if the relation service-customer already exist
   */
  isServiceCustomerExist(): ServiceCustomer {
    return this.servicesCustomers.find(sc => sc.serviceId === this.selectedService.id
      && sc.customerId === this.selectedCustomer.id);
  }

}
