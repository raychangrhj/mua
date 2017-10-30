import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import { AddressState } from '../../shared/ngrx/reducers/address/address.reducer';
import {
  getCustomerAddressState,
  State
} from '../../shared/ngrx/reducers/index.reducer';
import { QuestionsBaseComponent } from '../../../shared/questions-base/questions-base.component';

@Component({
  selector: 'regions-confirm-address',
  templateUrl: './confirm-address.component.html',
  styleUrls: ['../../../../shared/top-level.component.scss', './confirm-address.component.scss']
})
export class QuestionsExistingCustomerConfirmAddressComponent extends QuestionsBaseComponent implements OnInit, OnDestroy {

  private address$: Subscription;
  public address: AddressState;

  public ngOnInit() {
    super.ngOnInit();

    this.address$ = this.store.select(getCustomerAddressState)
      .subscribe((address: AddressState) => {
        this.address = address;
      });
  }

  public ngOnDestroy() {
    this.address$.unsubscribe();
  }

  constructor(
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected store: Store<State>
  ) {
    super(router, activatedRoute, store);
  }

}
