import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import { Store } from '@ngrx/store';
import {
  FormBuilder,
  Validators
} from '@angular/forms';

import { QuestionsBaseComponent } from '../../../shared/questions-base/questions-base.component';
import { AccountStateObject } from '../../ngrx/reducers/accounts/accounts.reducer';
import {
  AccountAddAction,
  AccountUpdateAction
} from '../../ngrx/actions/acounts/acounts.action';
import {
  AssetsState,
  getTempAccountsState
} from '../../ngrx/reducers/index.reducer';
import { validMoneyRegex } from '../../../../shared/form-validators';

@Component({
  selector: 'regions-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['../../../../shared/top-level.component.scss', './balance.component.scss']
})
export class QuestionsAssetsAccountsBalanceComponent extends QuestionsBaseComponent implements OnInit {

  public currentAccount: AccountStateObject;
  public tempAccount: AccountStateObject;

  public formatBalance() {
    const number = this.form.controls['balance'].value;
    const cleanNumber = number ? number.replace(/[,]/g, '') : '';
    const commaNumber = cleanNumber ? cleanNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '';
    const renderString = commaNumber ? commaNumber.split('') : '';
    if (renderString && renderString[0] === '$') {
      this.form.controls['balance'].setValue(
        `${commaNumber}`
      );
    } else {
      this.form.controls['balance'].setValue(
        `$${commaNumber}`
      );
    }
    this.form.controls['balance'].updateValueAndValidity();
  }

  public ngOnInit() {
    super.ngOnInit();

    const currentAccount$ = this.activatedRoute.data.map((data => data.currentAccount)).take(1);
    const tempAccount$ = this.store.select(getTempAccountsState).take(1);

    Observable.forkJoin(currentAccount$, tempAccount$)
      .take(1)
      .subscribe((resolves: [AccountStateObject, AccountStateObject]) => {
        if (resolves[0]) {
          this.currentAccount = resolves[0];
          this.form.controls['balance'].setValue(resolves[0].balance);
        } else {
          this.tempAccount = resolves[1];
          this.form.controls['balance'].setValue(resolves[1].balance);
        }
      });
  }

  constructor(
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected store: Store<AssetsState>,
    protected formBuilder: FormBuilder
  ) {
    super(router, activatedRoute, store);
    this.onSubmitMethod = () => {
      if (this.currentAccount) {
        this.store.dispatch(new AccountUpdateAction(this.currentAccount, Object.assign({},
          this.currentAccount,
          {
            balance: this.form.value.balance && this.form.value.balance.replace
              ? parseInt(this.form.value.balance.replace('$', '').replace(',', ''), 10)
              : this.form.value.balance
          }
        )));
      } else {
        this.store.dispatch(new AccountAddAction(
          Object.assign({}, this.tempAccount, {
            balance: this.form.value.balance && this.form.value.balance.replace
              ? parseInt(this.form.value.balance.replace('$', '').replace(',', ''), 10)
              : this.form.value.balance
          })
        ));
      }
    };
    this.form = formBuilder.group({
      balance: [null, [Validators.required, Validators.pattern(validMoneyRegex)]]
    });
  }

}
