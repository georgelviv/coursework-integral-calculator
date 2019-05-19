import { TestBed, async } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ResultsOutputComponent } from './results-output.component';

describe('ResultsOutputComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ResultsOutputComponent
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    }).compileComponents();
  }));

  it('should create the user input component', () => {
    const fixture = TestBed.createComponent(ResultsOutputComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have isCounting - true by default'`, () => {
    const fixture = TestBed.createComponent(ResultsOutputComponent);
    const app = fixture.debugElement.componentInstance;

    expect(app.isCounting).toEqual(false);
  });

  it('should render title in a button tag', () => {
    const fixture = TestBed.createComponent(ResultsOutputComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.results-output__details-p').textContent)
      .toContain('На даний момент калькулятор підтримує наступні константи, оператори та функції:');
  });
});
