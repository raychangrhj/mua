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
  getCustomerEmailState,
  State
} from '../../shared/ngrx/reducers/index.reducer';
import { EmailUpdateAction } from '../../shared/ngrx/actions/email/email.action';
import { QuestionsBaseComponent } from '../../../shared/questions-base/questions-base.component';

@Component({
  selector: 'regions-email',
  templateUrl: './email.component.html',
  styleUrls: ['../../../../shared/top-level.component.scss', './email.component.scss']
})
export class QuestionsNewCustomerEmailComponent extends QuestionsBaseComponent implements OnInit {

  public ngOnInit() {
    super.ngOnInit();

    this.store.select(getCustomerEmailState)
      .take(1)
      .subscribe((email: string) => {
        this.form.controls['email'].setValue(email);
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
      this.store.dispatch(new EmailUpdateAction(
        this.form.value.email
      ));
    };
    this.form = formBuilder.group({
      email: [null, [Validators.required, Validators.email]]
    });
  }

}
