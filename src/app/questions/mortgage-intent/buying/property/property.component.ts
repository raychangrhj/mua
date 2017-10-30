import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {
  FormBuilder,
  Validators
} from '@angular/forms';
import 'rxjs/add/operator/take';
import { Store } from '@ngrx/store';

import { QuestionsBaseComponent } from '../../../shared/questions-base/questions-base.component';
import { State } from '../../shared/ngrx/reducers/index.reducer';
import { MortgageTypeUpdateAction } from '../../shared/ngrx/actions/mortgage-type/mortgage-type.action';

@Component({
  selector: 'regions-property',
  templateUrl: './property.component.html',
  styleUrls: ['../../../../shared/top-level.component.scss', './property.component.scss']
})
export class QuestionsMortgageIntentPropertyComponent extends QuestionsBaseComponent {

  // TODO add the user flow changes based on if the user answers yes/no

  constructor(
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected store: Store<State>,
    protected formBuilder: FormBuilder
  ) {
    super(router, activatedRoute, store);
    this.onSubmitMethod = () => {
      this.store.dispatch(new MortgageTypeUpdateAction(
        this.form.value.locationPicked === 'no'
          ? 'pre-qualification'
          : 'buy'
      ));
      if (this.form.value.locationPicked === 'no') {
        this.saveAction = ['/mortgage-intent/pre-qualification'];
      }
    };
    this.form = formBuilder.group({
      locationPicked: [null, Validators.required]
    })
  }

}
