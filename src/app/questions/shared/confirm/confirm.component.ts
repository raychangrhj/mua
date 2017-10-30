import {
  Component,
  OnInit
} from '@angular/core';
import { Store } from '@ngrx/store';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import 'rxjs/add/operator/take';

import { ConfirmAnswer } from '../../../../models/confirm-answer';
import { State as NewCustomerState } from '../../customer/shared/ngrx/reducers/index.reducer';
import { ConfirmRouteData } from '../../../../models/route-data';
import { QuestionsBaseComponent } from '../questions-base/questions-base.component';
import { NavigationCompleteSectionAction } from '../ngrx/actions/navigation.action';
import { MortgageIntentState } from '../../mortgage-intent/shared/ngrx/reducers/index.reducer';

@Component({
  selector: 'regions-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['../../../shared/top-level.component.scss', './confirm.component.scss']
})
export class QuestionsConfirmComponent extends QuestionsBaseComponent implements OnInit {

  private sectionId: number;
  public confirmAnswers: Array<ConfirmAnswer> = [];

  public onSubmit() {
    this.store.dispatch(new NavigationCompleteSectionAction(
      this.sectionId
    ));
  }

  public ngOnInit() {
    super.ngOnInit();

    this.activatedRoute.data
      .map((obj) => obj.sectionId)
      .take(1)
      .subscribe((sectionId: number) => {
        this.sectionId = sectionId;
      });

    this.activatedRoute.data
      .map((obj: ConfirmRouteData) => obj.answers)
      .take(1)
      .subscribe((answers: ConfirmAnswer[]) => {
        if (Array.isArray(answers)) {
          answers.forEach((answer: ConfirmAnswer) => {
            answer.response = this.store.select(answer.selector);
          });
          this.confirmAnswers = answers;
        }
      });
  }

  constructor (
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected store: Store<NewCustomerState | MortgageIntentState>,
  ) {
    super(router, activatedRoute, store);
  }

}
