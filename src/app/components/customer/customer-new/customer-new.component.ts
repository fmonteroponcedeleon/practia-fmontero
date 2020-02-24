import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { BusinessService } from 'src/app/services/business.service';

@Component({
  selector: 'app-customer-new',
  templateUrl: './customer-new.component.html',
  styleUrls: ['./customer-new.component.css']
})
export class CustomerNewComponent implements OnInit {

  constructor(
    private businessService: BusinessService,
    private router: Router) { }

  ngOnInit() {
  }

  onSubmit(f: NgForm) {
    this.businessService.createCustomer(
      f.value['inputFirstName'], f.value['inputLastName'], f.value['inputDocumentNumber'],
      f.value['inputEmail'], f.value['inputMobile'], f.value['inputPhone'], f.value['inputMonthlyAmount']).subscribe(
        (serviceResult: string) => {
          this.router.navigate(['/customers']);
          // TODO: Toastr notification!
        },
        error => {

        }
      );
  }

  back(): void {
    this.router.navigate(['/customers']);
  }

}
