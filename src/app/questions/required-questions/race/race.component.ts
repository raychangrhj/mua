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
import 'rxjs/add/operator/take';

import {
  getRaceState,
  GovernmentQuestionsState,
  RaceState
} from '../ngrx/reducers/government-questions.reducer';
import { QuestionsBaseComponent } from '../../shared/questions-base/questions-base.component';
import { Subscription } from 'rxjs/Subscription';
import { GovernmentQuestionsRaceUpdateAction } from '../ngrx/actions/government-questions.action';

@Component({
  selector: 'regions-race',
  templateUrl: './race.component.html',
  styleUrls: ['../../../shared/top-level.component.scss', './race.component.scss']
})
export class QuestionsRequiredQuestionsRaceComponent extends QuestionsBaseComponent implements OnInit, OnDestroy {

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
            && k !== 'americanIndianText'
            && k !== 'otherAsianText'
            && k !== 'otherPacificIslanderText'
          )
          .some(k => this.form.value[k]);
        if (!any) {
          this.form.controls['optOut'].setValidators(Validators.requiredTrue);
          this.form.controls['optOut'].updateValueAndValidity();
        }
      }
    }
  }

  public toggleCheckOnTextChange(controlName: string) {
    if (this.form.controls[`${controlName}Text`].value.trim()) {
      this.form.controls[controlName].setValue(true);
    }
  }

  public toggleRequireTextInput(controlName: string) {
    if (this.form.controls[controlName].value) {
      this.form.controls[`${controlName}Text`].setValidators(Validators.required);
    } else {
      this.form.controls[`${controlName}Text`].setValidators(null);
      this.form.controls[`${controlName}Text`].setValue(null);
    }
    this.form.controls[`${controlName}Text`].updateValueAndValidity();
  }

  public ngOnDestroy() {
    this.valueChanges$.forEach(subscription => subscription.unsubscribe());
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

  public ngOnInit() {
    super.ngOnInit();

    this.store.select(getRaceState)
      .take(1)
      .subscribe((data: RaceState) => {
        this.form.controls['americanIndian'].setValue(data.americanIndian.selected);
        this.form.controls['americanIndianText'].setValue(data.americanIndian.tribe);
        this.form.controls['asian'].setValue(data.asian);
        this.form.controls['asianIndian'].setValue(data.asianIndian);
        this.form.controls['chinese'].setValue(data.chinese);
        this.form.controls['filipino'].setValue(data.filipino);
        this.form.controls['japanese'].setValue(data.japanese);
        this.form.controls['korean'].setValue(data.korean);
        this.form.controls['vietnamese'].setValue(data.vietnamese);
        this.form.controls['otherAsian'].setValue(data.otherAsian.selected);
        this.form.controls['otherAsianText'].setValue(data.otherAsian.other);
        this.form.controls['africanAmerican'].setValue(data.africanAmerican);
        this.form.controls['pacificIslander'].setValue(data.pacificIslander);
        this.form.controls['nativeHawaiian'].setValue(data.nativeHawaiian);
        this.form.controls['guamanian'].setValue(data.guamanian);
        this.form.controls['samoan'].setValue(data.samoan);
        this.form.controls['otherPacificIslander'].setValue(data.otherPacificIslander.selected);
        this.form.controls['otherPacificIslanderText'].setValue(data.otherPacificIslander.other);
        this.form.controls['white'].setValue(data.white);
        this.form.controls['optOut'].setValue(data.optOut);
      });

    Object.keys(this.form.controls)
      .filter(key =>
        key !== 'optOut'
        && key !== 'americanIndianText'
        && key !== 'otherAsianText'
        && key !== 'otherPacificIslanderText')
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
      this.store.dispatch(new GovernmentQuestionsRaceUpdateAction({
        americanIndian: {
          selected: this.form.value.americanIndian,
          tribe: this.form.value.americanIndianText
        },
        asian: this.form.value.asian,
        asianIndian: this.form.value.asianIndian,
        chinese: this.form.value.chinese,
        filipino: this.form.value.filipino,
        japanese: this.form.value.japanese,
        korean: this.form.value.korean,
        vietnamese: this.form.value.vietnamese,
        otherAsian: {
          selected: this.form.value.otherAsian,
          other: this.form.value.otherAsianText
        },
        africanAmerican: this.form.value.africanAmerican,
        pacificIslander: this.form.value.pacificIslander,
        nativeHawaiian: this.form.value.nativeHawaiian,
        guamanian: this.form.value.guamanian,
        samoan: this.form.value.samoan,
        otherPacificIslander: {
          selected: this.form.value.otherPacificIslander,
          other: this.form.value.otherPacificIslanderText
        },
        white: this.form.value.white,
        optOut: this.form.value.optOut,
      }));
    };
    this.form = formBuilder.group({
      americanIndian: [],
      americanIndianText: [],
      asian: [],
      asianIndian: [],
      chinese: [],
      filipino: [],
      japanese: [],
      korean: [],
      vietnamese: [],
      otherAsian: [],
      otherAsianText: [],
      africanAmerican: [],
      pacificIslander: [],
      nativeHawaiian: [],
      guamanian: [],
      samoan: [],
      otherPacificIslander: [],
      otherPacificIslanderText: [],
      white: [],
      optOut: [null, Validators.requiredTrue]
    });
  }

}
