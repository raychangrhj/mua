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
  getGovernmentQuestionsFederalDebtDelinquenciesState,
  GovernmentQuestionsState
} from '../ngrx/reducers/government-questions.reducer';
import { QuestionsBaseComponent } from '../../shared/questions-base/questions-base.component';
import { GovernmentQuestionsFederalDebtDelinquenciesUpdateAction } from '../ngrx/actions/government-questions.action';

@Component({
  selector: 'regions-federal-debt-delinquencies',
  templateUrl: './federal-debt-delinquencies.component.html',
  styleUrls: ['../../../shared/top-level.component.scss', './federal-debt-delinquencies.component.scss']
})
export class QuestionsRequiredQuestionsFederalDebtDelinquenciesComponent extends QuestionsBaseComponent implements OnInit {

  public ngOnInit() {
    super.ngOnInit();

    this.store.select(getGovernmentQuestionsFederalDebtDelinquenciesState)
      .take(1)
      .subscribe((bool: boolean) => {
        if (bool !== null) {
          this.form.controls['federalDebtDelinquencies'].setValue(bool ? 'yes' : 'no');
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
      this.store.dispatch(new GovernmentQuestionsFederalDebtDelinquenciesUpdateAction(
        this.form.value.federalDebtDelinquencies === 'yes'
      ));
    };
    this.form = formBuilder.group({
      federalDebtDelinquencies: [null, Validators.required]
    });
  }

}
