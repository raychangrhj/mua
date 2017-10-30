import {
  Component,
  ElementRef,
  NgZone,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  FormBuilder,
  Validators
} from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/take';
import { MapsAPILoader } from '@agm/core';

import {
  getTempCompanyLocationState,
  getTempCompanyNameState,
  IncomeState
} from '../../ngrx/reducers/index.reducer';
import { QuestionsBaseComponent } from '../../../shared/questions-base/questions-base.component';
import { EmploymentLocationState } from '../../ngrx/reducers/temp-employment/temp-employement.reducer';
import { TempEmploymentLocationUpdateAction } from '../../ngrx/actions/temp-employment/temp-employment.action';
import { EmploymentStateObject } from '../../ngrx/reducers/employment/employement.reducer';
import { EmploymentUpdateAction } from '../../ngrx/actions/employment/employment.action';
import {
  stateCodeValidator,
  states,
  validZipRegex
} from '../../../../shared/form-validators';

@Component({
  selector: 'regions-employment-location',
  templateUrl: './company-location.component.html',
  styleUrls: ['../../../../shared/top-level.component.scss', './company-location.component.scss']
})
export class QuestionsIncomeEmploymentCompanyLocationComponent extends QuestionsBaseComponent implements OnInit {

  @ViewChild('autocomplete')
  private autoComplete: ElementRef;

  public currentEmployment: EmploymentStateObject;
  public companyName$: Observable<string>;
  public stateOptions = states;

  public ngOnInit() {
    super.ngOnInit();

    const currentEmployment$ = this.activatedRoute.data.map((data => data.currentEmployment)).take(1);
    const tempEmploymentLocation$ = this.store.select(getTempCompanyLocationState).take(1);

    Observable.forkJoin(currentEmployment$, tempEmploymentLocation$)
      .subscribe((resolves: [EmploymentStateObject, EmploymentLocationState]) => {
        if (resolves[0]) {
          this.currentEmployment = resolves[0];
          this.form.controls['street'].setValue(resolves[0].location.street);
          this.form.controls['unit'].setValue(resolves[0].location.unit);
          this.form.controls['city'].setValue(resolves[0].location.city);
          this.form.controls['state'].setValue(resolves[0].location.state);
          this.form.controls['zip'].setValue(resolves[0].location.zip);
        } else {
          this.form.controls['street'].setValue(resolves[1].street);
          this.form.controls['unit'].setValue(resolves[1].unit);
          this.form.controls['city'].setValue(resolves[1].city);
          this.form.controls['state'].setValue(resolves[1].state);
          this.form.controls['zip'].setValue(resolves[1].zip);
        }
      }).unsubscribe();

    this.companyName$ = this.store.select(getTempCompanyNameState);

    this.mapsAPILoader.load().then(() => {
      const autoComplete = new google.maps.places.Autocomplete(this.autoComplete.nativeElement, {
        types: ['address']
      });
      autoComplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          const place: google.maps.places.PlaceResult = autoComplete.getPlace();
          const isDefined = (key: any): boolean => {
            return key !== undefined && key !== null
          };
          if (!isDefined(place.name) || !isDefined(place.address_components)) {
            return;
          }
          const street = place.name;
          const city = place.address_components.find(obj => obj.types.indexOf('locality') > -1);
          const state = place.address_components.find(obj => obj.types.indexOf('administrative_area_level_1') > -1);
          const postal = place.address_components.find(obj => obj.types.indexOf('postal_code') > -1);
          const postalSuffix = place.address_components.find(obj => obj.types.indexOf('postal_code_suffix') > -1);
          let zip = postal ? postal.long_name : null;
          zip += zip
            ? postalSuffix ? `-${postalSuffix.long_name}` : ''
            : null;
          this.form.controls['street'].setValue(street);
          this.form.controls['city'].setValue(city ? city.long_name : null);
          this.form.controls['state'].setValue(state ? state.short_name : null);
          this.form.controls['zip'].setValue(zip);
        });
      });
    });
  }

  constructor(
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected store: Store<IncomeState>,
    protected formBuilder: FormBuilder,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {
    super(router, activatedRoute, store);
    this.onSubmitMethod = () => {
      if (this.currentEmployment) {
        this.store.dispatch(new EmploymentUpdateAction(
          this.currentEmployment,
          Object.assign({},
            this.currentEmployment,
            {
              location: this.form.value
            }
          )
        ));
      } else {
        this.store.dispatch(new TempEmploymentLocationUpdateAction(
          this.form.value
        ));
      }
    };
    this.form = formBuilder.group({
      street: [null, Validators.required],
      unit: [],
      city: [null, Validators.required],
      state: [null, [Validators.required, stateCodeValidator]],
      zip: [null, [Validators.required, Validators.pattern(validZipRegex)]]
    });
  }

}
