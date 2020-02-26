import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BusinessService } from 'src/app/services/business.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-service-new',
  templateUrl: './service-new.component.html',
  styleUrls: ['./service-new.component.css']
})
export class ServiceNewComponent implements OnInit {

  constructor(
    private businessService: BusinessService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
  }

  /**
   * Responsible to create a new service
   * @param f form with the values entered by the user
   */
  onSubmit(f: any) {
    this.businessService.createService(f.value.inputName, f.value.inputMonthlyFee).subscribe(
      (serviceResult: string) => {
        this.toastr.success('Servicio creado con exito!');
        this.router.navigate(['/services']);
      },
      error => {
        this.toastr.error('Se produjo un error y no se pudo crear el cliente');
      }
    );
  }

  /**
   * Back to the service list view
   */
  back(): void {
    this.router.navigate(['/services']);
  }

}
