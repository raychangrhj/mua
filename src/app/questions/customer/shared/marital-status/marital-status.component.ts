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
import 'rxjs/add/operator/map';

import {
  getCustomerMaritalStatusState,
  State
} from '../ngrx/reducers/index.reducer';
import { MaritalStatusUpdateAction } from '../ngrx/actions/marital-status/marital-status.action';
import { QuestionsBaseComponent } from '../../../shared/questions-base/questions-base.component';

@Component({
  selector: 'regions-marital-status',
  templateUrl: './marital-status.component.html',
  styleUrls: ['../../../../shared/top-level.component.scss', './marital-status.component.scss']
})
export class QuestionsCustomerMaritalStatusComponent extends QuestionsBaseComponent implements OnInit {

  public ngOnInit() {
    super.ngOnInit();

    this.store.select(getCustomerMaritalStatusState)
      .take(1)
      .subscribe((status: string) => {
        this.form.controls['maritalStatus'].setValue(status);
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
      this.store.dispatch(new MaritalStatusUpdateAction(
        this.form.value.maritalStatus
      ));
    };
    this.form = formBuilder.group({
      maritalStatus: [null, Validators.required]
    });
  }

}
