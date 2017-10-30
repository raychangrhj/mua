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
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/observable/of';

import {
  getGovernmentQuestionsOwnershipInterestState,
  getGovernmentQuestionsUSCitizenState,
  GovernmentQuestionsState
} from '../ngrx/reducers/government-questions.reducer';
import { QuestionsBaseComponent } from '../../shared/questions-base/questions-base.component';
import { GovernmentQuestionsOwnershipInterestUpdateAction } from '../ngrx/actions/government-questions.action';

@Component({
  selector: 'regions-ownership-interest',
  templateUrl: './ownership-interest.component.html',
  styleUrls: ['../../../shared/top-level.component.scss', './ownership-interest.component.scss']
})
export class QuestionsRequiredQuestionsOwnershipInterestComponent extends QuestionsBaseComponent implements OnInit {

  public ngOnInit() {
    super.ngOnInit();

    this.store.select(getGovernmentQuestionsUSCitizenState)
      .take(1)
      .subscribe((isUsCitizen: boolean) => {
        if (isUsCitizen) {
          this.actionBtnLinkOptions$ = Observable.of({
            back: {
              link: {
                routerLink: '/required-questions/us-citizen'
              }
            },
            next: true,
            saveAndExit: true
          });
        }
      });

    this.store.select(getGovernmentQuestionsOwnershipInterestState)
      .take(1)
      .subscribe((bool: boolean) => {
        if (bool !== null) {
          this.form.controls['ownershipInterest'].setValue(bool ? 'yes' : 'no');
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
      this.store.dispatch(new GovernmentQuestionsOwnershipInterestUpdateAction(
        this.form.value.ownershipInterest === 'yes'
      ));
    };
    this.form = formBuilder.group({
      ownershipInterest: [null, Validators.required]
    });
  }

}
