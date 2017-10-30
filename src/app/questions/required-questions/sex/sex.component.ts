import {
  Component,
  OnDestroy,
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
import { Subscription } from 'rxjs/Subscription';

import {
  getSexState,
  GovernmentQuestionsState,
  SexState
} from '../ngrx/reducers/government-questions.reducer';
import { QuestionsBaseComponent } from '../../shared/questions-base/questions-base.component';
import { GovernmentQuestionsSexUpdateAction } from '../ngrx/actions/government-questions.action';

@Component({
  selector: 'regions-sex',
  templateUrl: './sex.component.html',
  styleUrls: ['../../../shared/top-level.component.scss', './sex.component.scss']
})
export class QuestionsRequiredQuestionsSexComponent extends QuestionsBaseComponent implements OnInit, OnDestroy {

  private valueChanges$: Subscription[] = [];

  private updateOptOutValidators(key) {
    return (value) => {
      if (value) {
        this.form.controls['optOut'].setValidators(null);
        this.form.controls['optOut'].updateValueAndValidity();
      } else {
        const any = Object.keys(this.form.value)
          .filter(k =>
            k !== key
            && k !== 'optOut'
          )
          .some(k => this.form.value[k]);
        if (!any) {
          this.form.controls['optOut'].setValidators(Validators.requiredTrue);
          this.form.controls['optOut'].updateValueAndValidity();
        }
      }
    }
  }

  public optOutChange() {
    Object.keys(this.form.controls)
      .filter(key => key !== 'optOut')
      .forEach(key => {
        if (this.form.controls['optOut'].value) {
          this.form.controls[key].setValue(null);
          this.form.controls[key].disable();
        } else {
          this.form.controls[key].enable();
        }
      });
  }

  public ngOnDestroy() {
    this.valueChanges$.forEach(subscription => subscription.unsubscribe());
  }

  public ngOnInit() {
    super.ngOnInit();

    this.store.select(getSexState)
      .take(1)
      .subscribe((data: SexState) => {
        this.form.controls['female'].setValue(data.female);
        this.form.controls['male'].setValue(data.male);
        this.form.controls['optOut'].setValue(data.optOut);
      });

    Object.keys(this.form.controls)
      .filter(key => key !== 'optOut')
      .forEach(key => {
        this.valueChanges$.push(this.form.controls[key].valueChanges.subscribe(this.updateOptOutValidators(key)))
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
      this.store.dispatch(new GovernmentQuestionsSexUpdateAction(
        this.form.value
      ));
    };
    this.form = formBuilder.group({
      female: [],
      male: [],
      optOut: [null, Validators.requiredTrue]
    });
  }

}
