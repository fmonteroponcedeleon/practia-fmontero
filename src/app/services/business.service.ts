import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Customer } from '../models/customer';
import { Service } from '../models/service';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  private headers: HttpHeaders;
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiUrl + '/cliente/');
  }

  getCustomerById(customerId: number): Observable<Customer> {
    return this.http.get<Customer>(this.apiUrl + '/cliente/' + customerId);
  }

  createCustomer(fullName: string, documentNumber: string, address: string, phone: string, dateOfBirth: string) {
    const body = JSON.stringify({
      nombreCompleto: fullName,
      cedula: documentNumber,
      direccion: address,
      telefono: phone,
      fechaNacimiento: dateOfBirth
    });
    return this.http.post<string>(this.apiUrl + '/cliente/', body, { headers: this.headers });
  }

  editCustomer(customer: Customer) {
    const body = JSON.stringify({
      nombreCompleto: customer.fullName,
      cedula: customer.documentNumber,
      direccion: customer.address,
      telefono: customer.phone,
      fechaNacimiento: customer.dateOfBirth
    });
    return this.http.put<string>(this.apiUrl + '/cliente/' + customer.id, body, { headers: this.headers });
  }

  deleteCustomer(customerId: number) {
    return this.http.delete<string>(this.apiUrl + '/cliente/' + customerId);
  }

  getServices(): Observable<Service[]> {
    return this.http.get<Service[]>(this.apiUrl + '/servicios/');
  }

  getServiceById(serviceId: number): Observable<Service> {
    return this.http.get<Service>(this.apiUrl + '/servicios/' + serviceId);
  }

  createService(name: string, monthlyFee: number) {
    const body = JSON.stringify({
      nombre: name,
      cuotaMensual: monthlyFee
    });
    return this.http.post<string>(this.apiUrl + '/servicios/', body, { headers: this.headers });
  }

  editService(service: Service) {
    const body = JSON.stringify({
      nombre: service.name,
      cuotaMensual: service.monthlyFee
    });
    return this.http.put<string>(this.apiUrl + '/servicios/' + service.id, body, { headers: this.headers });
  }

  deleteService(serviceId: number) {
    return this.http.delete<string>(this.apiUrl + '/servicios/' + serviceId);
  }

}
