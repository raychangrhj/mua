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
  getGovernmentQuestionsPermanentResidentAlienState,
  GovernmentQuestionsState
} from '../ngrx/reducers/government-questions.reducer';
import { QuestionsBaseComponent } from '../../shared/questions-base/questions-base.component';
import { GovernmentQuestionsPermanentResidentAlienUpdateAction } from '../ngrx/actions/government-questions.action';

@Component({
  selector: 'regions-permanent-resident-alien',
  templateUrl: './permanent-resident-alien.component.html',
  styleUrls: ['../../../shared/top-level.component.scss', './permanent-resident-alien.component.scss']
})
export class QuestionsRequiredQuestionsPermanentResidentAlienComponent extends QuestionsBaseComponent implements OnInit {

  public ngOnInit() {
    super.ngOnInit();

    this.store.select(getGovernmentQuestionsPermanentResidentAlienState)
      .take(1)
      .subscribe((bool: boolean) => {
        if (bool !== null) {
          this.form.controls['permanentResidentAlien'].setValue(bool ? 'yes' : 'no');
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
      this.store.dispatch(new GovernmentQuestionsPermanentResidentAlienUpdateAction(
        this.form.value.permanentResidentAlien === 'yes'
      ));
    };
    this.form = formBuilder.group({
      permanentResidentAlien: [null, Validators.required]
    });
  }

}
