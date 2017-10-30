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
import 'rxjs/add/operator/take';

import {
  getCustomerNameState,
  State
} from '../../shared/ngrx/reducers/index.reducer';
import { Store } from '@ngrx/store';
import { NameState } from '../../shared/ngrx/reducers/name/name.reducer';
import { NameUpdateAction } from '../../shared/ngrx/actions/name/name.action';
import { QuestionsBaseComponent } from '../../../shared/questions-base/questions-base.component';
import { TypeUpdateAction } from '../../shared/ngrx/actions/type/type.action';
import { nameTypes } from '../../../../shared/select-definitions';

@Component({
  selector: 'regions-name',
  templateUrl: './name.component.html',
  styleUrls: ['../../../../shared/top-level.component.scss', './name.component.scss']
})
export class QuestionsNewCustomerNameComponent extends QuestionsBaseComponent implements OnInit {

  public nameTypes: {} = nameTypes;

  public ngOnInit() {
    super.ngOnInit();

    this.store.dispatch(new TypeUpdateAction('new'));

    this.store.select(getCustomerNameState)
      .take(1)
      .subscribe((name: NameState) => {
        if (name.first) { this.form.controls['first'].setValue(name.first); }
        if (name.middle) { this.form.controls['middle'].setValue(name.middle); }
        if (name.last) { this.form.controls['last'].setValue(name.last); }
        if (name.suffix) { this.form.controls['suffix'].setValue(name.suffix); }
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
      this.store.dispatch(new NameUpdateAction(
        this.form.value
      ));
    };
    this.form = formBuilder.group({
      first: [null, Validators.required],
      middle: [],
      last: [null, Validators.required],
      suffix: []
    });
  }

}
