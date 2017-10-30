import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/take';

import {
  IncomeResetAction,
  IncomeSetAction
} from '../questions/income/ngrx/actions/reset/reset.action';
import {
  GovernmentQuestionsResetAction,
  GovernmentQuestionsSetAction
} from '../questions/required-questions/ngrx/actions/government-questions.action';
import {
  CustomerResetAction,
  CustomerSetAction
} from '../questions/customer/shared/ngrx/actions/reset/reset.action';
import {
  AssetsResetAction,
  AssetsSetAction
} from '../questions/assets/ngrx/actions/reset/reset.action';
import {
  getIncomeState,
  IncomeState,
  initialIncomeState,
  State as Income
} from '../questions/income/ngrx/reducers/index.reducer';
import {
  CustomerState,
  getCustomerState,
  initialCustomerState,
  State as Customer
} from '../questions/customer/shared/ngrx/reducers/index.reducer';
import {
  getGovernmentQuestionsState,
  GovernmentQuestionsState,
  initialGovernmentQuestionsState,
  State as Gov
} from '../questions/required-questions/ngrx/reducers/government-questions.reducer';
import {
  AssetsState,
  getAssetsState,
  initialAssetsState,
  State as Assets
} from '../questions/assets/ngrx/reducers/index.reducer';

export interface Borrower {
  assets: AssetsState,
  customer: CustomerState,
  governmentQuestions: GovernmentQuestionsState,
  income: IncomeState
}

@Injectable()
export class BorrowerCacheService {

  private coBorrower: Borrower = {
    assets: initialAssetsState,
    customer: initialCustomerState,
    governmentQuestions: initialGovernmentQuestionsState,
    income: initialIncomeState
  };
  private borrower: Borrower = {
    assets: initialAssetsState,
    customer: initialCustomerState,
    governmentQuestions: initialGovernmentQuestionsState,
    income: initialIncomeState
  };

  public switchCustomerType(customerType: 'borrower' | 'coBorrower') {
    const assets$ = this.store.select(getAssetsState).take(1);
    const customer$ = this.store.select(getCustomerState).take(1);
    const govQuestions$ = this.store.select(getGovernmentQuestionsState).take(1);
    const income$ = this.store.select(getIncomeState).take(1);

    Observable.forkJoin(assets$, customer$, govQuestions$, income$)
      .take(1)
      .subscribe((resolves: [AssetsState, CustomerState, GovernmentQuestionsState, IncomeState]) => {
        this[customerType === 'borrower' ? 'coBorrower' : 'borrower'] = {
          assets: resolves[0],
          customer: resolves[1],
          governmentQuestions: resolves[2],
          income: resolves[3]
        };

        this.store.dispatch(new AssetsSetAction(this[customerType].assets));
        this.store.dispatch(new CustomerSetAction(this[customerType].customer));
        this.store.dispatch(new GovernmentQuestionsSetAction(this[customerType].governmentQuestions));
        this.store.dispatch(new IncomeSetAction(this[customerType].income));
      });
  }

  public getBorrowerAddress() {
    return this.borrower && this.borrower.customer && this.borrower.customer.address;
  }

  public getBorrowerAddressInfo() {
    return this.borrower && this.borrower.customer && this.borrower.customer.addressInfo;
  }

  constructor (
    private store: Store<Income | Customer | Gov | Assets>
  ) {}

}
