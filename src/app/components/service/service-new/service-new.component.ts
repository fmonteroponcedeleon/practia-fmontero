import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BusinessService } from 'src/app/services/business.service';

@Component({
  selector: 'app-service-new',
  templateUrl: './service-new.component.html',
  styleUrls: ['./service-new.component.css']
})
export class ServiceNewComponent implements OnInit {

  constructor(
    private businessService: BusinessService,
    private router: Router) { }

  ngOnInit() {
  }

  onSubmit(f: any) {
    this.businessService.createService(f.value.inputName, f.value.inputMonthlyFee).subscribe(
      (serviceResult: string) => {
        this.router.navigate(['/services']);
        // TODO: Toastr notification!
      },
      error => {
        // TODO: Handling error!
      }
    );
  }

  back(): void {
    this.router.navigate(['/services']);
  }

}
