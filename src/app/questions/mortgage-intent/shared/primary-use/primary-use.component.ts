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
import { Store } from '@ngrx/store';

import { PrimaryUseUpdateAction } from '../ngrx/actions/primary-use/primary-use.action';
import { QuestionsBaseComponent } from '../../../shared/questions-base/questions-base.component';
import {
  getMortgagePrimaryUseState,
  State
} from '../ngrx/reducers/index.reducer';

@Component({
  selector: 'regions-primary-use',
  templateUrl: './primary-use.component.html',
  styleUrls: ['../../../../shared/top-level.component.scss', './primary-use.component.scss']
})
export class QuestionsMortgageIntentPrimaryUseComponent extends QuestionsBaseComponent implements OnInit {

  public ngOnInit() {
    super.ngOnInit();

    this.store.select(getMortgagePrimaryUseState)
      .take(1)
      .subscribe((primaryUse: string) => {
        this.form.controls['primaryUse'].setValue(primaryUse);
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
      this.store.dispatch(new PrimaryUseUpdateAction(
        this.form.value.primaryUse
      ));
    };
    this.form = formBuilder.group({
      primaryUse: [null, Validators.required]
    })
  }

}
