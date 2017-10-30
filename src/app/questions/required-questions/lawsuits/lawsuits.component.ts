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
  getGovernmentQuestionsLawsuitsState,
  GovernmentQuestionsState
} from '../ngrx/reducers/government-questions.reducer';
import { QuestionsBaseComponent } from '../../shared/questions-base/questions-base.component';
import { GovernmentQuestionsLawsuitsUpdateAction } from '../ngrx/actions/government-questions.action';

@Component({
  selector: 'regions-lawsuits',
  templateUrl: './lawsuits.component.html',
  styleUrls: ['../../../shared/top-level.component.scss', './lawsuits.component.scss']
})
export class QuestionsRequiredQuestionsLawsuitsComponent extends QuestionsBaseComponent implements OnInit {

  public ngOnInit() {
    super.ngOnInit();

    this.store.select(getGovernmentQuestionsLawsuitsState)
      .take(1)
      .subscribe((bool: boolean) => {
        if (bool !== null) {
          this.form.controls['lawsuits'].setValue(bool ? 'yes' : 'no');
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
      this.store.dispatch(new GovernmentQuestionsLawsuitsUpdateAction(
        this.form.value.lawsuits === 'yes'
      ));
    };
    this.form = formBuilder.group({
      lawsuits: [null, Validators.required]
    });
  }

}
