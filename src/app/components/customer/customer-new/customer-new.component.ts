import { Component, OnInit } from '@angular/core';
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

  onSubmit(f: any) {
    this.businessService.createCustomer(
      f.value.inputFullName, f.value.inputDocumentNumber, f.value.inputAddress,
      f.value.inputPhone, f.value.inputDateOfBirth).subscribe(
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
