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
  getGovernmentQuestionsForeclosureJudgementsState,
  GovernmentQuestionsState
} from '../ngrx/reducers/government-questions.reducer';
import { QuestionsBaseComponent } from '../../shared/questions-base/questions-base.component';
import { GovernmentQuestionsForeclosureJudgementsUpdateAction } from '../ngrx/actions/government-questions.action';

@Component({
  selector: 'regions-foreclosure-judgements',
  templateUrl: './foreclosure-judgements.component.html',
  styleUrls: ['../../../shared/top-level.component.scss', './foreclosure-judgements.component.scss']
})
export class QuestionsRequiredQuestionsForeclosureJudgementsComponent extends QuestionsBaseComponent implements OnInit {

  public ngOnInit() {
    super.ngOnInit();

    this.store.select(getGovernmentQuestionsForeclosureJudgementsState)
      .take(1)
      .subscribe((bool: boolean) => {
        if (bool !== null) {
          this.form.controls['foreclosureJudgements'].setValue(bool ? 'yes' : 'no');
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
      this.store.dispatch(new GovernmentQuestionsForeclosureJudgementsUpdateAction(
        this.form.value.foreclosureJudgements === 'yes'
      ));
    };
    this.form = formBuilder.group({
      foreclosureJudgements: [null, Validators.required]
    });
  }

}
