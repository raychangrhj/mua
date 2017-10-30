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
import { AccountUpdateAction } from '../../ngrx/actions/acounts/acounts.action';
import { TempAccountUpdateTypeUpdateAction } from '../../ngrx/actions/temp-accounts/temp-accounts.action';
import {
  AssetsState,
  getTempAccountsState
} from '../../ngrx/reducers/index.reducer';
import { accountTypes } from '../../../../shared/select-definitions';

@Component({
  selector: 'regions-type',
  templateUrl: './type.component.html',
  styleUrls: ['../../../../shared/top-level.component.scss', './type.component.scss']
})
export class QuestionsAssetsAccountsTypeComponent extends QuestionsBaseComponent implements OnInit {

  public currentAccount: AccountStateObject;
  public bankName: string;
  public accountTypes: {} = accountTypes;
  public foo = 'bar';

  public ngOnInit() {
    super.ngOnInit();

    const currentAccount$ = this.activatedRoute.data.map((data => data.currentAccount)).take(1);
    const tempAccount$ = this.store.select(getTempAccountsState).take(1);

    Observable.forkJoin(currentAccount$, tempAccount$)
      .subscribe((resolves: [AccountStateObject, AccountStateObject]) => {
        if (resolves[0]) {
          console.log(`0:\n${resolves[0]}`)
          this.currentAccount = resolves[0];
          this.bankName = resolves[0].bankName;
          this.form.controls['type'].setValue(resolves[0].type ? resolves[0].type.toString() : resolves[0].type);
        } else {
          console.log(resolves[1])
          this.bankName = resolves[1].bankName;
          console.log(`${this.bankName}`)
          this.form.controls['type'].setValue(resolves[1].type ? resolves[1].type.toString() : resolves[1].type);
        }
      }).unsubscribe();
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
            type: this.form.value.type
          }
        )));
      } else {
        this.store.dispatch(new TempAccountUpdateTypeUpdateAction(this.form.value.type));
      }
    };
    this.form = formBuilder.group({
      type: [null, Validators.required]
    });
  }

}
