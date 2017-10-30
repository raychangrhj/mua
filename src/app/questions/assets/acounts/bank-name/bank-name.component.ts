import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import { Store } from '@ngrx/store';
import {
  FormBuilder,
  Validators
} from '@angular/forms';
import { Observable } from 'rxjs/Rx';

import { QuestionsBaseComponent } from '../../../shared/questions-base/questions-base.component';
import {
  AssetsState,
  getTempAccountsBankNameState
} from '../../ngrx/reducers/index.reducer';
import { AccountStateObject } from '../../ngrx/reducers/accounts/accounts.reducer';
import { AccountUpdateAction } from '../../ngrx/actions/acounts/acounts.action';
import { TempAccountBankNameUpdateAction } from '../../ngrx/actions/temp-accounts/temp-accounts.action';

@Component({
  selector: 'regions-bank-name',
  templateUrl: './bank-name.component.html',
  styleUrls: ['../../../../shared/top-level.component.scss', './bank-name.component.scss']
})
export class QuestionsAssetsAccountsBankNameComponent extends QuestionsBaseComponent implements OnInit {

  public currentAccount: AccountStateObject;

  public ngOnInit() {
    super.ngOnInit();

    const currentAccount$ = this.activatedRoute.data.map((data => data.currentAccount)).take(1);
    const tempAccountBankName$ = this.store.select(getTempAccountsBankNameState).take(1);

    Observable.forkJoin(currentAccount$, tempAccountBankName$)
      .subscribe((resolves: [AccountStateObject, string]) => {
        if (resolves[0]) {
          this.currentAccount = resolves[0];
          this.form.controls['bankName'].setValue(resolves[0].bankName);
        } else {
          this.form.controls['bankName'].setValue(resolves[1]);
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
            bankName: this.form.value.bankName
          }
        )));
      } else {
        this.store.dispatch(new TempAccountBankNameUpdateAction(this.form.value.bankName));
      }
    };
    this.form = formBuilder.group({
      bankName: [null, Validators.required]
    });
  }

}
