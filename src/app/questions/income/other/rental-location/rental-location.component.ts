import {
  Component,
  ElementRef,
  NgZone,
  OnInit,
  ViewChild
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
import { Observable } from 'rxjs/Rx';
import { MapsAPILoader } from '@agm/core';

import { QuestionsBaseComponent } from '../../../shared/questions-base/questions-base.component';
import {
  getTempOtherIncomesState,
  IncomeState
} from '../../ngrx/reducers/index.reducer';
import { OtherIncomeStateObject } from '../../ngrx/reducers/other/other.reducer';
import {
  OtherIncomeAddAction,
  OtherIncomeUpdateAction
} from '../../ngrx/actions/other/other.action';
import {
  stateCodeValidator,
  states,
  validZipRegex
} from '../../../../shared/form-validators';

@Component({
  selector: 'regions-rental-location',
  templateUrl: './rental-location.component.html',
  styleUrls: ['../../../../shared/top-level.component.scss', './rental-location.component.scss']
})
export class QuestionsIncomeRentalLocationComponent extends QuestionsBaseComponent implements OnInit {

  @ViewChild('autocomplete')
  private autoComplete: ElementRef;
  private tempOtherIncome: OtherIncomeStateObject;

  public currentOtherIncome: OtherIncomeStateObject;
  public stateOptions = states;

  public ngOnInit() {
    super.ngOnInit();

    const currentOtherIncome$: Observable<OtherIncomeStateObject> = this.activatedRoute.data.map((data => data.currentOtherIncome)).take(1);
    const tempOtherIncome$: Observable<OtherIncomeStateObject> = this.store.select(getTempOtherIncomesState).take(1);

    Observable.forkJoin(currentOtherIncome$, tempOtherIncome$)
      .subscribe((resolves: [OtherIncomeStateObject, OtherIncomeStateObject]) => {
        if (resolves[0]) {
          this.currentOtherIncome = resolves[0];
          this.form.controls['street'].setValue(resolves[0].rentalLocation.street);
          this.form.controls['unit'].setValue(resolves[0].rentalLocation.unit);
          this.form.controls['city'].setValue(resolves[0].rentalLocation.city);
          this.form.controls['state'].setValue(resolves[0].rentalLocation.state);
          this.form.controls['zip'].setValue(resolves[0].rentalLocation.zip);
        } else {
          this.tempOtherIncome = resolves[1];
          if (resolves[1] && resolves[1].rentalLocation) {
            this.form.controls['street'].setValue(resolves[1].rentalLocation.street);
            this.form.controls['unit'].setValue(resolves[1].rentalLocation.unit);
            this.form.controls['city'].setValue(resolves[1].rentalLocation.city);
            this.form.controls['state'].setValue(resolves[1].rentalLocation.state);
            this.form.controls['zip'].setValue(resolves[1].rentalLocation.zip);
          }
        }
      }).unsubscribe();

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
      if (this.currentOtherIncome) {
        this.store.dispatch(new OtherIncomeUpdateAction(
          this.currentOtherIncome,
          Object.assign({},
            this.currentOtherIncome,
            {
              rentalLocation: this.form.value
            }
          )
        ))
      } else {
        this.store.dispatch(new OtherIncomeAddAction(
          Object.assign({},
            this.tempOtherIncome,
            {
              rentalLocation: this.form.value
            }
          )
        ));
      }
    };
    this.form = formBuilder.group({
      street: [null, Validators.required],
      unit: [],
      city: [null, Validators.required],
      state: [null, [Validators.required, stateCodeValidator]],
      zip: [null, [Validators.required, Validators.pattern(validZipRegex)]],
    });
  }

}
