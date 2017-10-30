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
  getGovernmentQuestionsAlimonyState,
  GovernmentQuestionsState
} from '../ngrx/reducers/government-questions.reducer';
import { QuestionsBaseComponent } from '../../shared/questions-base/questions-base.component';
import { GovernmentQuestionsAlimonyUpdateAction } from '../ngrx/actions/government-questions.action';

@Component({
  selector: 'regions-alimony',
  templateUrl: './alimony.component.html',
  styleUrls: ['../../../shared/top-level.component.scss', './alimony.component.scss']
})
export class QuestionsRequiredQuestionsAlimonyComponent extends QuestionsBaseComponent implements OnInit {

  public ngOnInit() {
    super.ngOnInit();

    this.store.select(getGovernmentQuestionsAlimonyState)
      .take(1)
      .subscribe((bool: boolean) => {
        if (bool !== null) {
          this.form.controls['alimony'].setValue(bool ? 'yes' : 'no');
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
      this.store.dispatch(new GovernmentQuestionsAlimonyUpdateAction(
        this.form.value.alimony === 'yes'
      ));
    };
    this.form = formBuilder.group({
      alimony: [null, Validators.required]
    });
  }

}
