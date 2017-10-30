import {
  Component,
  HostBinding
} from '@angular/core';

import { LenderService } from '../../lender/services/lender.service';
import { LoanOfficer } from '../../lender/models/loan-officer-response';
import { BaseComponent } from '../../shared/base/base.component';
import {
  ActivatedRoute,
  Router
} from '@angular/router';

@Component({
  selector: 'regions-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['../../shared/top-level.component.scss', './thank-you.component.scss']
})
export class GeneralThankYouComponent extends BaseComponent {

  public mlo: LoanOfficer;

  constructor (
    protected lenderService: LenderService,
    protected router: Router,
    protected activatedRoute: ActivatedRoute
  ) {
    super(router, activatedRoute);
    this.mlo = lenderService.getMLO();
  }

}
