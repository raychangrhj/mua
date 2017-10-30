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
  getCustomerPhoneState,
  State
} from '../../shared/ngrx/reducers/index.reducer';
import { PhoneUpdateAction } from '../../shared/ngrx/actions/phone/phone.action';
import { QuestionsBaseComponent } from '../../../shared/questions-base/questions-base.component';
import { validPhoneRegex } from '../../../../shared/form-validators';
import { PhoneState } from '../../shared/ngrx/reducers/phone/phone.reducer';
import { phoneTypes } from '../../../../shared/select-definitions';

@Component({
  selector: 'regions-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['../../../../shared/top-level.component.scss', './phone.component.scss']
})
export class QuestionsNewCustomerPhoneComponent extends QuestionsBaseComponent implements OnInit {

  public phoneTypes: {} = phoneTypes;

  public formatPhone() {
    if (this.form.controls['number'].invalid) {
      return;
    }
    const number = this.form.controls['number'].value;
    const splitNumber = number ? number.replace(/\D/g, '').split('') : null;
    if (splitNumber && splitNumber.length === 10) {
      this.form.controls['number'].setValue(
        `(${
          splitNumber.splice(0, 3).join('')
        }) ${
          splitNumber.splice(0, 3).join('')
        }-${
          splitNumber.join('')
        }`
      );
    } else if (splitNumber && splitNumber.length > 10) {
      this.form.controls['number'].setValue(
        `+${
          splitNumber.splice(0, splitNumber.length - 10).join('')
        } (${
          splitNumber.splice(0, 3).join('')
        }) ${
          splitNumber.splice(0, 3).join('')
        }-${
          splitNumber.join('')
        }`
      );
    }
    this.form.controls['number'].updateValueAndValidity();
  }

  public ngOnInit() {
    super.ngOnInit();
    this.store.select(getCustomerPhoneState)
      .take(1)
      .subscribe((phone: PhoneState) => {
        console.log(phone)
        this.form.controls['type'].setValue(phone ? phone.type : null);
        this.form.controls['number'].setValue(phone ? phone.number : null);
      });
  }

  constructor(
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected store: Store<State>,
    private formBuild: FormBuilder
  ) {
    super(router, activatedRoute, store);
    this.onSubmitMethod = () => {
      this.store.dispatch(new PhoneUpdateAction(
        this.form.value
      ));
    };
    this.form = formBuild.group({
      type: [null, Validators.required],
      number: [null, [Validators.required, Validators.pattern(validPhoneRegex)]]
    })
  }

}
