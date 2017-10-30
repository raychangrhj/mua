import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {
  FormBuilder,
  Validators
} from '@angular/forms';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/take';

import { CostUpdateAction } from '../ngrx/actions/cost/cost.action';
import { QuestionsBaseComponent } from '../../../shared/questions-base/questions-base.component';
import { validMoneyRegex } from '../../../../shared/form-validators';
import {
  getMortgageCostState,
  getMortgageTypeState,
  State
} from '../ngrx/reducers/index.reducer';

@Component({
  selector: 'regions-cost',
  templateUrl: './cost.component.html',
  styleUrls: ['../../../../shared/top-level.component.scss', './cost.component.scss']
})
export class QuestionsMortgageIntentCostComponent extends QuestionsBaseComponent implements OnInit {

  public mortgageType: string;
  
  public formatPrice() {
    const number = this.form.controls['price'].value;
    const cleanNumber = number ? number.replace(/[,]/g, '') : '';
    const commaNumber = cleanNumber ? cleanNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '';
    const renderString = commaNumber ? commaNumber.split('') : '';
    if (renderString && renderString[0] === '$') {
      this.form.controls['price'].setValue(
        `${commaNumber}`
      );
    } else {
      this.form.controls['price'].setValue(
        `$${commaNumber}`
      );
    }
    this.form.controls['price'].updateValueAndValidity();
  }

  constructor(
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected store: Store<State>,
    protected formBuilder: FormBuilder
  ) {
    super(router, activatedRoute, store);
    this.onSubmitMethod = () => {
      this.store.dispatch(new CostUpdateAction(
        this.form.value.price && this.form.value.price.replace
          ? parseInt(this.form.value.price.replace('$', '').replace(',', ''), 10)
          : this.form.value.price
      ));
    };
    this.form = formBuilder.group({
      price: [null, [Validators.required, Validators.pattern(validMoneyRegex)]]
    });
  }

}
