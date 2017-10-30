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
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/take';

import {
  getCustomerSSNState,
  State
} from '../../shared/ngrx/reducers/index.reducer';
import { SSNUpdateAction } from '../../shared/ngrx/actions/ssn/ssn.action';
import { QuestionsBaseComponent } from '../../../shared/questions-base/questions-base.component';
import { validSSNRegex } from '../../../../shared/form-validators';

@Component({
  selector: 'regions-ssn',
  templateUrl: './ssn.component.html',
  styleUrls: ['../../../../shared/top-level.component.scss', './ssn.component.scss']
})
export class QuestionsNewCustomerSSNComponent extends QuestionsBaseComponent implements OnInit {

  public formatSSN() {
    const number = this.form.controls['ssn'].value;
    const splitNumber = number ? number.replace(/\D/g, '').split('') : null;
    if (splitNumber && splitNumber.length === 9) {
      this.form.controls['ssn'].setValue(
        `${
          splitNumber.splice(0, 3).join('')
        }-${
          splitNumber.splice(0, 2).join('')
        }-${
          splitNumber.join('')
        }`
      )
    }
  }

  public ngOnInit() {
    super.ngOnInit();

    this.store.select(getCustomerSSNState)
      .take(1)
      .subscribe((ssn: string) => {
        this.form.controls['ssn'].setValue(ssn);
      });
  }

  constructor(
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected store: Store<State>,
    protected formBuilder: FormBuilder
  ) {
    super(router, activatedRoute, store);
    this.onSubmitMethod = () => {
      this.store.dispatch(new SSNUpdateAction(
        this.form.value.ssn
      ));
    };
    this.form = formBuilder.group({
      ssn: [null, [Validators.required, Validators.pattern(validSSNRegex)]]
    });
  }

}
