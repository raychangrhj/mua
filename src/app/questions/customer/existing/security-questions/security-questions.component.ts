import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {
  FormBuilder,
  Validators
} from '@angular/forms';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/take';

import { QuestionsBaseComponent } from '../../../shared/questions-base/questions-base.component';
import { State } from '../../shared/ngrx/reducers/index.reducer';
import {
  getAuthenticationQuestionState,
  QuestionState
} from '../ngrx/reducers/authentication.reducer';
import { AuthenticationAnswerSubmitAction } from '../ngrx/actions/authentication.action';

@Component({
  selector: 'regions-security-questions',
  templateUrl: './security-questions.component.html',
  styleUrls: ['../../../../shared/top-level.component.scss', './security-questions.component.scss']
})
export class QuestionsExistingCustomerSecurityQuestionsComponent extends QuestionsBaseComponent implements OnInit {

  // TODO add Guard to this route
  public questionState: QuestionState;

  public ngOnInit() {
    super.ngOnInit();

    this.store.select(getAuthenticationQuestionState)
      .take(1)
      .subscribe((data: QuestionState) => {
        this.questionState = data;
      });
  }

  constructor(
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected store: Store<State>,
    protected formBuilder: FormBuilder) {
    super(router, activatedRoute, store);
    this.onSubmitMethod = () => {
      this.store.dispatch(new AuthenticationAnswerSubmitAction({
        answer: this.form.value.answer,
        id: this.questionState.id,
        questionId: this.questionState.questionId,
        sessionId: this.questionState.sessionId,
        version: this.questionState.version,
        email: this.questionState.email
      }));
    };
    this.form = formBuilder.group({
      answer: [null, Validators.required]
    });
  }

}
