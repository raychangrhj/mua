import { Component, } from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {
  FormBuilder,
  Validators
} from '@angular/forms';

import { State } from '../../shared/ngrx/reducers/index.reducer';
import { Store } from '@ngrx/store';
import { AuthenticationByDebitAction } from '../ngrx/actions/authentication.action';
import { QuestionsBaseComponent } from '../../../shared/questions-base/questions-base.component';

@Component({
  selector: 'regions-atm-card',
  templateUrl: './atm-card.component.html',
  styleUrls: ['../../../../shared/top-level.component.scss', './atm-card.component.scss']
})
export class QuestionsExistingCustomerAtmCardComponent extends QuestionsBaseComponent {

  constructor(
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected store: Store<State>,
    protected formBuilder: FormBuilder
  ) {
    super(router, activatedRoute, store);
    this.onSubmitMethod = () => {
      this.store.dispatch(new AuthenticationByDebitAction(
        this.form.value
      ));
    };
    this.form = formBuilder.group({
      cardNumber: [null, [Validators.required, Validators.pattern(/^(?:\d[ -]*?){13,16}$/)]],
      pinNumber: [null, [Validators.required, Validators.pattern(/^\d{4,10}$/)]]
    });
  }
}
