import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import { Store } from '@ngrx/store';
import {
  FormBuilder,
  Validators
} from '@angular/forms';

import { QuestionsBaseComponent } from '../../../shared/questions-base/questions-base.component';
import { IntentUpdateAction } from '../ngrx/actions/intent/intent.action';
import {
  getRefinanceIntentState,
  State
} from '../ngrx/reducers/index.reducer';

@Component({
  selector: 'regions-intent',
  templateUrl: './intent.component.html',
  styleUrls: ['../../../../shared/top-level.component.scss', './intent.component.scss']
})
export class QuestionsMortgageIntentRefinanceIntentComponent extends QuestionsBaseComponent implements OnInit {

  public ngOnInit() {
    super.ngOnInit();

    this.store.select(getRefinanceIntentState)
      .take(1)
      .subscribe((intent: string) => {
        this.form.controls['intent'].setValue(intent);
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
      this.store.dispatch(new IntentUpdateAction(
        this.form.value.intent
      ));
    };
    this.form = formBuilder.group({
      intent: [null, Validators.required]
    })
  }
}
