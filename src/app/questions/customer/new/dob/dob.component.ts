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

import {
  getCustomerDOBState,
  State
} from '../../shared/ngrx/reducers/index.reducer';
import { DOBUpdateAction } from '../../shared/ngrx/actions/dob/dob.action';
import { QuestionsBaseComponent } from '../../../shared/questions-base/questions-base.component';
import { CustomValidators } from 'ng2-validation';

@Component({
  selector: 'regions-dob',
  templateUrl: './dob.component.html',
  styleUrls: ['../../../../shared/top-level.component.scss', './dob.component.scss']
})
export class QuestionsNewCustomerDOBComponent extends QuestionsBaseComponent implements OnInit {

  public ngOnInit() {
    super.ngOnInit();

    this.store.select(getCustomerDOBState)
      .take(1)
      .subscribe((dob: string) => {
        this.form.controls['dob'].setValue(dob);
      });
  }

  constructor(
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected store: Store<State>,
    protected formBuilder: FormBuilder,
  ) {
    super(router, activatedRoute, store);
    this.onSubmitMethod = () => {
      this.store.dispatch(new DOBUpdateAction(
        this.form.value.dob
      ));
    };
    this.form = formBuilder.group({
      dob: [null, [Validators.required, CustomValidators.date]]
    });
  }

}
