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
  getGovernmentQuestionsForeclosuresState,
  GovernmentQuestionsState
} from '../ngrx/reducers/government-questions.reducer';
import { QuestionsBaseComponent } from '../../shared/questions-base/questions-base.component';
import { GovernmentQuestionsForeclosuresUpdateAction } from '../ngrx/actions/government-questions.action';

@Component({
  selector: 'regions-foreclosures',
  templateUrl: './foreclosures.component.html',
  styleUrls: ['../../../shared/top-level.component.scss', './foreclosures.component.scss']
})
export class QuestionsRequiredQuestionsForeclosuresComponent extends QuestionsBaseComponent implements OnInit {

  public ngOnInit() {
    super.ngOnInit();

    this.store.select(getGovernmentQuestionsForeclosuresState)
      .take(1)
      .subscribe((bool: boolean) => {
        if (bool !== null) {
          this.form.controls['foreclosures'].setValue(bool ? 'yes' : 'no');
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
      this.store.dispatch(new GovernmentQuestionsForeclosuresUpdateAction(
        this.form.value.foreclosures === 'yes'
      ));
    };
    this.form = formBuilder.group({
      foreclosures: [null, Validators.required]
    });
  }

}
