import {
  Component,
  Output,
  EventEmitter,
  ViewChild,
  OnInit
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import {
  Integral,
  IntegralMethods,
  IntegralMethod,
  IntegralOptions
} from '@app/entities';
import { ValidateFormula } from '@app/validators';

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: [ './user-input.component.scss' ]
})
export class UserInputComponent implements OnInit {

  @Output() public submit = new EventEmitter<[Integral, IntegralOptions]>();

  @ViewChild('userInputForm') form;

  public from = '0';
  public to = '1';
  public n = '10';
  public formulaFormControl: FormControl;
  public integralMethods = IntegralMethods;
  public integralMethod: IntegralMethod = IntegralMethod.RiemannSum;

  public integralMethodsTranslations: { [key: string]: string } = {
    [IntegralMethod.RiemannSum]: 'Метод прямокутників',
    [IntegralMethod.TrapezoidalRule]: 'Метод трапецій'
  };

  public ngOnInit(): void {
    this.formulaFormControl = new FormControl('x', [
      Validators.required,
      ValidateFormula()
    ]);
  }

  public onSubmit(evt: Event): void {
    evt.stopPropagation();

    const integral: Integral =  {
      from: Number(this.from),
      to: Number(this.to),
      formula: this.formulaFormControl.value,
    };
    const n: number = Number(this.n);
    const integralOptions: IntegralOptions = {
      n: Number(this.n),
      method: this.integralMethod
    };

    this.submit.emit([integral, integralOptions]);
  }

  public get isDisabledSubmit(): boolean {
    return !this.form.valid || this.formulaFormControl.invalid;
  }
}
