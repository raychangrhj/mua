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
  getGovernmentQuestionsOutstandingJudgementsState,
  GovernmentQuestionsState
} from '../ngrx/reducers/government-questions.reducer';
import { QuestionsBaseComponent } from '../../shared/questions-base/questions-base.component';
import { GovernmentQuestionsOutstandingJudgementsUpdateAction } from '../ngrx/actions/government-questions.action';

@Component({
  selector: 'regions-outstanding-judgements',
  templateUrl: './outstanding-judgements.component.html',
  styleUrls: ['../../../shared/top-level.component.scss', './outstanding-judgements.component.scss']
})
export class QuestionsRequiredQuestionsOutstandingJudgementsComponent extends QuestionsBaseComponent implements OnInit {

  public ngOnInit() {
    super.ngOnInit();

    this.store.select(getGovernmentQuestionsOutstandingJudgementsState)
      .take(1)
      .subscribe((bool: boolean) => {
        if (bool !== null) {
          this.form.controls['outstandingJudgements'].setValue(bool ? 'yes' : 'no');
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
      this.store.dispatch(new GovernmentQuestionsOutstandingJudgementsUpdateAction(
        this.form.value.outstandingJudgements === 'yes'
      ));
    };
    this.form = formBuilder.group({
      outstandingJudgements: [null, Validators.required]
    });
  }

}
