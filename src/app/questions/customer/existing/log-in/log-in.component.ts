import { Component } from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {
  FormBuilder,
  Validators
} from '@angular/forms';
import { Store } from '@ngrx/store';

import { State } from '../../shared/ngrx/reducers/index.reducer';
import { AuthenticationAuthenticateAction } from '../ngrx/actions/authentication.action';
import { QuestionsBaseComponent } from '../../../shared/questions-base/questions-base.component';

@Component({
  selector: 'regions-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['../../../../shared/top-level.component.scss', './log-in.component.scss']
})
export class QuestionsExistingCustomerLogInComponent extends QuestionsBaseComponent {

  constructor(
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected store: Store<State>,
    protected formBuilder: FormBuilder,
  ) {
    super(router, activatedRoute, store);
    this.onSubmitMethod = () => {
      this.store.dispatch(new AuthenticationAuthenticateAction({
        username: this.form.value.username,
        password: this.form.value.password
      }));
    };
    this.form = formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    })
  }

}
