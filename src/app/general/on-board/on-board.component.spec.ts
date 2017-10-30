import {
  async,
  ComponentFixture,
  inject,
  TestBed
} from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';


import { GeneralOnBoardComponent } from './on-board.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('GeneralOnBoardComponent', () => {
  let component: GeneralOnBoardComponent;
  let fixture: ComponentFixture<GeneralOnBoardComponent>;
  let activatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: jasmine.createSpyObj('activatedRoute.data', ['map']),
          }
        }
      ],
      declarations: [ GeneralOnBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(inject([ActivatedRoute], (_activatedRoute_) => {
    activatedRoute = _activatedRoute_;
    activatedRoute.data.map.and.callFake(filter => {
      if (filter({ continueLink: true })) {
        return Observable.of('/continue-link');
      }

      if (filter({ saveAction: true })) {
        return Observable.of(null);
      }
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralOnBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
