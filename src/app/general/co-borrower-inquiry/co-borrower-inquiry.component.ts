import { Component } from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import { Store } from '@ngrx/store';
import {
  FormBuilder,
  Validators
} from '@angular/forms';

import { QuestionsBaseComponent } from '../../questions/shared/questions-base/questions-base.component';

@Component({
  selector: 'regions-co-borrower-inquiry',
  templateUrl: './co-borrower-inquiry.component.html',
  styleUrls: ['../../shared/top-level.component.scss', './co-borrower-inquiry.component.scss']
})
export class GeneralCoBorrowerInquiryComponent extends QuestionsBaseComponent {

  constructor(
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected store: Store<any>,
    protected formBuilder: FormBuilder,
  ) {
    super(router, activatedRoute, store);
    this.onSubmitMethod = () => {
      this.router.navigate([
        this.form.value.coBorrower === 'yes' ? '/co-borrower-inquiry/hand-off' : '/confirm-submission'
      ]);
    };
    this.form = formBuilder.group({
      coBorrower: [null, Validators.required]
    });
  }

}
