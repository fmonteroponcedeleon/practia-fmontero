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

  public docNumber: string;
  public isValidUruguayanDocNumber = true;
  public errorDesc = '';

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

  validateUruguayanDocumentNumber(docNumber: number): void {
    const ciNumber = !!docNumber ? docNumber.toString() : '';
    console.log('docNumber', docNumber);
    console.log('ciNumber', ciNumber);

    //Initial control about the length of the ciNumber 
    if (ciNumber.length === 8 || ciNumber.length === 7) {

      let _formula: number[] = [2, 9, 8, 7, 6, 3, 4];
      let _suma = 0;
      let _guion = 0;
      let _aux = 0;
      let _numero: number[] = [0, 0, 0, 0, 0, 0, 0, 0];

      if (ciNumber.length === 8) {
        let ciNumberAux = parseInt(ciNumber);
        _numero[0] = parseInt(ciNumberAux.toString()[0].toString());
        _numero[1] = parseInt(ciNumberAux.toString()[1].toString());
        _numero[2] = parseInt(ciNumberAux.toString()[2].toString());
        _numero[3] = parseInt(ciNumberAux.toString()[3].toString());
        _numero[4] = parseInt(ciNumberAux.toString()[4].toString());
        _numero[5] = parseInt(ciNumberAux.toString()[5].toString());
        _numero[6] = parseInt(ciNumberAux.toString()[6].toString());
        _numero[7] = parseInt(ciNumberAux.toString()[7].toString());
      }

      //For UY CI numbers less than one million. 
      else if (ciNumber.length === 7) {
        _numero[0] = 0;
        _numero[1] = parseInt(ciNumber[0]);
        _numero[2] = parseInt(ciNumber[1]);
        _numero[3] = parseInt(ciNumber[2]);
        _numero[4] = parseInt(ciNumber[3]);
        _numero[5] = parseInt(ciNumber[4]);
        _numero[6] = parseInt(ciNumber[5]);
        _numero[7] = parseInt(ciNumber[6]);
      }

      _suma = (_numero[0] * _formula[0]) + (_numero[1] * _formula[1])
        + (_numero[2] * _formula[2]) + (_numero[3] * _formula[3])
        + (_numero[4] * _formula[4]) + (_numero[5] * _formula[5]) + (_numero[6] * _formula[6]);

      for (let i = 0; i < 10; i++) {
        _aux = _suma + i;
        if (_aux % 10 === 0) {
          _guion = _aux - _suma;
          i = 10;
        }
      }

      if (_numero[7] === _guion) {
        this.errorDesc = '';
        this.isValidUruguayanDocNumber = true;
      } else {
        this.errorDesc = 'La Cédula de Identidad ingresada no es valida. '
          + 'Verifique que todos sus dígitos y su dígito verificador, sean correctos.';
        this.isValidUruguayanDocNumber = false;
      }
    } else {
      this.errorDesc = 'La Cédula de Identidad ingresada no es valida, debe tener 7 u 8 dígitos.';
      this.isValidUruguayanDocNumber = false;
    }
  }

}
