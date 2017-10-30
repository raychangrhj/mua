import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';

import { GeneralConfirmSubmissionComponent } from './confirm-submission.component';
import { ActionBtnGroupComponent } from '../../shared/action-btn-group/action-btn-group.component';
import { reducer as navReducer } from '../../questions/shared/ngrx/reducers/navigation.reducer';
import { applicationReducer } from '../../ngrx/reducers/application.reducer';
import { ApplicationCompleteService } from '../core/application-complete.service';

describe('GeneralConfirmSubmissionComponent', () => {
  let component: GeneralConfirmSubmissionComponent;
  let fixture: ComponentFixture<GeneralConfirmSubmissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        RouterTestingModule,
        StoreModule.forRoot({
          navigation: navReducer,
          application: applicationReducer
        })
      ],
      providers: [
        {
          provide: ApplicationCompleteService,
          useValue: jasmine.createSpyObj('applicationCompleteService', ['submit'])
        }
      ],
      declarations: [
        GeneralConfirmSubmissionComponent,
        ActionBtnGroupComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralConfirmSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
