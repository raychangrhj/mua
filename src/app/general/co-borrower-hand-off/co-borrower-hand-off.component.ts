import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  ActivatedRoute,
  Router
} from '@angular/router';

import { QuestionsBaseComponent } from '../../questions/shared/questions-base/questions-base.component';
import { BorrowerCacheService } from '../../core/borrower-cache.service';

@Component({
  selector: 'regions-co-borrower-hand-off',
  templateUrl: './co-borrower-hand-off.component.html',
  styleUrls: ['../../shared/top-level.component.scss', './co-borrower-hand-off.component.scss']
})
export class GeneralCoBorrowerHandOffComponent extends QuestionsBaseComponent {

  public switchCustomerType(type: 'borrower' | 'coBorrower') {
    this.borrowerCacheService.switchCustomerType(type);
  }

  constructor(
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected store: Store<any>,
    protected borrowerCacheService: BorrowerCacheService
  ) {
    super(router, activatedRoute, store);
  }
}
