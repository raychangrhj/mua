import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {
  FormBuilder,
  Validators
} from '@angular/forms';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import {
  CustomerState,
  getCustomerState,
  State
} from '../ngrx/reducers/index.reducer';
import { AddressInfoUpdateAction } from '../ngrx/actions/address-info/address-info.action';
import { AddressState } from '../ngrx/reducers/address/address.reducer';
import { QuestionsBaseComponent } from '../../../shared/questions-base/questions-base.component';
import { BorrowerCacheService } from '../../../../core/borrower-cache.service';
import { specialDateValidator } from '../../../../shared/form-validators';

@Component({
  selector: 'regions-address-info',
  templateUrl: './address-info.component.html',
  styleUrls: ['../../../../shared/top-level.component.scss', './address-info.component.scss']
})
export class QuestionsCustomerAddressInfoComponent extends QuestionsBaseComponent implements OnInit {

  public address: AddressState;
  public isCoBorrowerPage$: Observable<boolean>;

  public useBorrowerAddressInfo(bool: boolean) {
    if (bool) {
      const addressInfo: string = this.borrowerCacheService.getBorrowerAddressInfo();
      this.form.controls['addressStartDate'].setValue(addressInfo || null);
    } else {
      this.form.reset();
    }
  }

  public ngOnInit() {
    super.ngOnInit();

    this.isCoBorrowerPage$ = this.activatedRoute.data.map(data => data.isCoBorrowerPage);

    this.store.select(getCustomerState)
      .take(1)
      .subscribe((customerState: CustomerState) => {
        this.address = customerState.address;
        this.form.controls['addressStartDate'].setValue(customerState.addressInfo);
      });
  }

  constructor(
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected store: Store<State>,
    protected formBuilder: FormBuilder,
    protected borrowerCacheService: BorrowerCacheService
  ) {
    super(router, activatedRoute, store);
    this.onSubmitMethod = () => {
      this.store.dispatch(new AddressInfoUpdateAction(
        this.form.value.addressStartDate
      ));
    };
    // TODO update the date validator to work with MM-YY for regions
    this.form = formBuilder.group({
      addressStartDate: [null, [Validators.required, specialDateValidator]]
    });
  }

}
