import { Component } from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { Store } from '@ngrx/store';

import { QuestionsBaseComponent } from '../../questions/shared/questions-base/questions-base.component';
import { State } from '../../questions/customer/shared/ngrx/reducers/index.reducer';

@Component({
  selector: 'regions-resend-pin',
  templateUrl: './resend-pin.component.html',
  styleUrls: ['../../shared/top-level.component.scss', './resend-pin.component.scss']
})
export class ResendPinComponent extends QuestionsBaseComponent {

  public form: FormGroup;

  constructor(
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected formBuilder: FormBuilder,
    protected store: Store<State>
  ) {
    super(router, activatedRoute, store);

    this.form = formBuilder.group({
      email: [null, [Validators.required, Validators.email]]
    });
  }

}
