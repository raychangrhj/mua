import { Component, OnInit } from '@angular/core';
import { QuestionsBaseComponent } from '../../../shared/questions-base/questions-base.component';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from '../ngrx/reducers/index.reducer';
import {
  FormBuilder,
  Validators
} from '@angular/forms';

@Component({
  selector: 'regions-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['../../../../shared/top-level.component.scss', './loans.component.scss']
})
export class QuestionsMortgageIntentRefinanceLoansComponent extends QuestionsBaseComponent implements OnInit {

  public loans: any[];

  constructor(
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected store: Store<State>,
    protected formBuilder: FormBuilder
  ) {
    super(router, activatedRoute, store);
    this.form = formBuilder.group({
      loanId: [null, Validators.required]
    })
  }
}
