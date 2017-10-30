import { Component } from '@angular/core';

import { LenderService } from '../../lender/services/lender.service';
import { LoanOfficer } from '../../lender/models/loan-officer-response';

@Component({
  selector: 'regions-lender',
  templateUrl: './lender.component.html',
  styleUrls: ['./lender.component.scss']
})
export class LenderComponent {

  public mlo: LoanOfficer;
  public notExpanded = true;
  public toggled = false;

  public cleanString (str: string) {
    return str.replace(/\D/g, '');
  }

  public expand() {
    this.toggled = true;
    this.notExpanded = !this.notExpanded;
  }

  constructor (lenderService: LenderService) {
    this.mlo = lenderService.getMLO();
  }

}
