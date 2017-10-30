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
  getGovernmentQuestionsCoMakerOnNoteState,
  GovernmentQuestionsState
} from '../ngrx/reducers/government-questions.reducer';
import { QuestionsBaseComponent } from '../../shared/questions-base/questions-base.component';
import { GovernmentQuestionsCoMakerOnNoteUpdateAction } from '../ngrx/actions/government-questions.action';

@Component({
  selector: 'regions-co-maker-on-note',
  templateUrl: './co-maker-on-note.component.html',
  styleUrls: ['../../../shared/top-level.component.scss', './co-maker-on-note.component.scss']
})
export class QuestionsRequiredQuestionsCoMakerOnNoteComponent extends QuestionsBaseComponent implements OnInit {

  public ngOnInit() {
    super.ngOnInit();

    this.store.select(getGovernmentQuestionsCoMakerOnNoteState)
      .take(1)
      .subscribe((bool: boolean) => {
        if (bool !== null) {
          this.form.controls['coMakerOnNote'].setValue(bool ? 'yes' : 'no');
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
      this.store.dispatch(new GovernmentQuestionsCoMakerOnNoteUpdateAction(
        this.form.value.coMakerOnNote === 'yes'
      ));
    };
    this.form = formBuilder.group({
      coMakerOnNote: [null, Validators.required]
    });
  }

}
