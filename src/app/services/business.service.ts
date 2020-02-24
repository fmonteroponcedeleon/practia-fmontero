import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  private headers: HttpHeaders;
  private apiUrl = 'http://localhost:3000/employees';

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiUrl);
  }

  getCustomerById(customerId: number): Observable<Customer> {
    return this.http.get<Customer>(this.apiUrl + '/' + customerId);
  }

  createCustomer(firstName: string, lastName: string, docNumber: string, email: string,
                 mobile: string, phone: string, monthlyAmount: string) {
    const body = JSON.stringify({
      first_name: firstName,
      last_name: lastName,
      docNumber,
      email,
      mobile,
      phone,
      monthlyAmount
    });
    return this.http.post<string>(this.apiUrl + '/', body, { headers: this.headers });
  }

  editCustomer(customer: Customer) {
    const body = JSON.stringify({
      first_name: customer.first_name,
      last_name: customer.last_name,
      docNumber: customer.docNumber,
      email: customer.email,
      mobile: customer.mobile,
      phone: customer.phone,
      monthlyAmount: customer.monthlyAmount
    });
    return this.http.put<string>(this.apiUrl + '/' + customer.id, body, { headers: this.headers });
  }

  deleteCustomer(customerId: string) {
    return this.http.delete<string>(this.apiUrl + '/' + customerId);
  }

}
