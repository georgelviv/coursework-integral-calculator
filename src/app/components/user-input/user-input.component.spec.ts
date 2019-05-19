import { TestBed, async } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserInputComponent } from './user-input.component';

describe('UserInputComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [
        UserInputComponent
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    }).compileComponents();
  }));

  it('should create the user input component', () => {
    const fixture = TestBed.createComponent(UserInputComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have from - 0, to - 1, n - 10, isAsync - true by default'`, () => {
    const fixture = TestBed.createComponent(UserInputComponent);
    const app = fixture.debugElement.componentInstance;

    expect(app.from).toEqual('0');
    expect(app.to).toEqual('1');
    expect(app.n).toEqual('10');
    expect(app.isAsync).toEqual(true);
  });

  it('should render title in a button tag', () => {
    const fixture = TestBed.createComponent(UserInputComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#user-input__submit-btn').textContent)
      .toContain('Порахувати');
  });
});
