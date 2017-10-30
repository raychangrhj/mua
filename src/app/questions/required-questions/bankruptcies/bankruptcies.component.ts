import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormBuilder,
  Validators
} from '@angular/forms';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/take';

import {
  getGovernmentQuestionsBankruptciesState,
  GovernmentQuestionsState
} from '../ngrx/reducers/government-questions.reducer';
import { QuestionsBaseComponent } from '../../shared/questions-base/questions-base.component';
import { GovernmentQuestionsBankruptciesUpdateAction } from '../ngrx/actions/government-questions.action';

@Component({
  selector: 'regions-bankruptcies',
  templateUrl: './bankruptcies.component.html',
  styleUrls: ['../../../shared/top-level.component.scss', './bankruptcies.component.scss']
})
export class QuestionsRequiredQuestionsBankruptciesComponent extends QuestionsBaseComponent implements OnInit {

  public ngOnInit() {
    super.ngOnInit();

    this.store.select(getGovernmentQuestionsBankruptciesState)
      .take(1)
      .subscribe((bool: boolean) => {
        if (bool !== null) {
          this.form.controls['bankruptcies'].setValue(bool ? 'yes' : 'no');
        }
      });
  }

  constructor(
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected store: Store<GovernmentQuestionsState>,
    protected formBuilder: FormBuilder
  ) {
    super(router, activatedRoute, store);
    this.onSubmitMethod = () => {
      this.store.dispatch(new GovernmentQuestionsBankruptciesUpdateAction(
        this.form.value.bankruptcies === 'yes'
      ));
    };
    this.form = formBuilder.group({
      bankruptcies: [null, Validators.required]
    });
  }

}
