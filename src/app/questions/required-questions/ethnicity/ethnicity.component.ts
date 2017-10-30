import {
  Component,
  OnDestroy,
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
  EthnicityState,
  getEthnicityState,
  GovernmentQuestionsState
} from '../ngrx/reducers/government-questions.reducer';
import { QuestionsBaseComponent } from '../../shared/questions-base/questions-base.component';
import { Subscription } from 'rxjs/Subscription';
import { GovernmentQuestionsEthnicityUpdateAction } from '../ngrx/actions/government-questions.action';

@Component({
  selector: 'regions-ethnicity',
  templateUrl: './ethnicity.component.html',
  styleUrls: ['../../../shared/top-level.component.scss', './ethnicity.component.scss']
})
export class QuestionsRequiredQuestionsEthnicityComponent extends QuestionsBaseComponent implements OnInit, OnDestroy {

  private valueChanges$: Subscription[] = [];

  private updateOptOutValidators(key) {
    return (value) => {
      if (value) {
        this.form.controls['optOut'].setValidators(null);
        this.form.controls['optOut'].updateValueAndValidity();
      } else {
        const any = Object.keys(this.form.value)
          .filter(k => k !== key && k !== 'optOut' && k !== 'otherHispanicText')
          .some(k => this.form.value[k]);
        if (!any) {
          this.form.controls['optOut'].setValidators(Validators.requiredTrue);
          this.form.controls['optOut'].updateValueAndValidity();
        }
      }
    }
  }

  public ngOnDestroy() {
    this.valueChanges$.forEach(subscription => subscription.unsubscribe());
  }

  public otherHispanicTextChange() {
    if (this.form.controls['otherHispanicText'].value.trim()) {
      this.form.controls['otherHispanic'].setValue(true);
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

  public otherHispanicChange() {
    if (this.form.controls['otherHispanic'].value) {
      this.form.controls['otherHispanicText'].setValidators(Validators.required);
    } else {
      this.form.controls['otherHispanicText'].setValidators(null);
      this.form.controls['otherHispanicText'].setValue(null);
    }
    this.form.controls['otherHispanicText'].updateValueAndValidity();
  }

  public ngOnInit() {
    super.ngOnInit();

    this.store.select(getEthnicityState)
      .take(1)
      .subscribe((data: EthnicityState) => {
        this.form.controls['hispanic'].setValue(data.hispanic);
        this.form.controls['mexican'].setValue(data.mexican);
        this.form.controls['puertoRican'].setValue(data.puertoRican);
        this.form.controls['cuban'].setValue(data.cuban);
        this.form.controls['otherHispanic'].setValue(data.otherHispanic.selected);
        this.form.controls['otherHispanicText'].setValue(data.otherHispanic.other);
        this.form.controls['nonHispanic'].setValue(data.nonHispanic);
        this.form.controls['optOut'].setValue(data.optOut);
      });

    Object.keys(this.form.controls)
      .filter(key => key !== 'optOut' && key !== 'otherHispanicText')
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
      this.store.dispatch(new GovernmentQuestionsEthnicityUpdateAction({
        hispanic: this.form.value.hispanic,
        mexican: this.form.value.mexican,
        puertoRican: this.form.value.puertoRican,
        cuban: this.form.value.cuban,
        otherHispanic: {
          selected: this.form.value.otherHispanic,
          other: this.form.value.otherHispanicText,
        },
        nonHispanic: this.form.value.nonHispanic,
        optOut: this.form.value.optOut
      }));
    };
    this.form = formBuilder.group({
      hispanic: [],
      mexican: [],
      puertoRican: [],
      cuban: [],
      otherHispanic: [],
      otherHispanicText: [],
      nonHispanic: [],
      optOut: [null, Validators.requiredTrue]
    });
  }

}
