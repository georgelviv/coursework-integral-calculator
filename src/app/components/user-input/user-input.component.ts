import {
  Component,
  Output,
  EventEmitter
} from '@angular/core';
import { NgForm } from '@angular/forms';

import { Integral } from '@app/entities';

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: [ './user-input.component.scss' ]
})
export class UserInputComponent {

  @Output() public submit = new EventEmitter<[Integral, number]>();

  public from = '0';
  public to = '1';
  public n = '10';
  public formula = 'x';

  public onSubmit(evt: Event, form: NgForm): void {
    evt.stopPropagation();

    const { from, to, formula } = form.value;
    const integral: Integral =  {
      from: Number(from),
      to: Number(to),
      formula,
    };

    const n: number = Number(this.n);

    this.submit.emit([integral, n]);
  }
}
