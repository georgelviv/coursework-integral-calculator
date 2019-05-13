import {
  Component,
  Output,
  EventEmitter,
  ViewChild,
  OnInit
} from '@angular/core';
import { NgForm, FormControl, Validators } from '@angular/forms';

import { Integral } from '@app/entities';
import { ValidateFormula } from '@app/validators';

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: [ './user-input.component.scss' ]
})
export class UserInputComponent implements OnInit {

  @Output() public submit = new EventEmitter<[Integral, number]>();

  @ViewChild('userInputForm') form;

  public from = '0';
  public to = '1';
  public n = '10';
  public formulaFormControl: FormControl;

  public ngOnInit(): void {
    this.formulaFormControl = new FormControl('x', [
      Validators.required,
      ValidateFormula()
    ]);
  }

  public onSubmit(evt: Event, form: NgForm): void {
    evt.stopPropagation();

    const integral: Integral =  {
      from: Number(this.from),
      to: Number(this.to),
      formula: this.formulaFormControl.value,
    };
    const n: number = Number(this.n);

    this.submit.emit([integral, n]);
  }

  public get isDisabledSubmit(): boolean {
    return !this.form.valid || this.formulaFormControl.invalid;
  }
}
