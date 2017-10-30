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
  selector: 'regions-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['../../shared/top-level.component.scss', './resume.component.scss']
})
export class ResumeComponent extends QuestionsBaseComponent {

  public form: FormGroup;

  public onSubmit() {
    super.onSubmit();
  }

  constructor(
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected formBuilder: FormBuilder,
    protected store: Store<State>
  ) {
    super(router, activatedRoute, store);

    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      ssn: [null, [Validators.required, Validators.pattern(/^\d{4}$/)]],
      pin: [null, Validators.required]
    });
  }

}
