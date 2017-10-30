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
  getGovernmentQuestionsUSCitizenState,
  GovernmentQuestionsState
} from '../ngrx/reducers/government-questions.reducer';
import { QuestionsBaseComponent } from '../../shared/questions-base/questions-base.component';
import { GovernmentQuestionsUSCitizenUpdateAction } from '../ngrx/actions/government-questions.action';

@Component({
  selector: 'regions-us-citizen',
  templateUrl: './us-citizen.component.html',
  styleUrls: ['../../../shared/top-level.component.scss', './us-citizen.component.scss']
})
export class QuestionsRequiredQuestionsUsCitizenComponent extends QuestionsBaseComponent implements OnInit {

  public ngOnInit() {
    super.ngOnInit();

    this.store.select(getGovernmentQuestionsUSCitizenState)
      .take(1)
      .subscribe((bool: boolean) => {
        if (bool !== null) {
          this.form.controls['usCitizen'].setValue(bool ? 'yes' : 'no');
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
      const isUsCitizen = this.form.value.usCitizen === 'yes';
      if (isUsCitizen) {
        this.saveAction = ['/required-questions/ownership-interest'];
      }
      this.store.dispatch(new GovernmentQuestionsUSCitizenUpdateAction(isUsCitizen));
    };
    this.form = formBuilder.group({
      usCitizen: [null, Validators.required]
    });
  }

}
