import { Component } from '@angular/core';

import {
  Integral,
  IntegralOptions
} from '@app/entities';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public integral: Integral;
  public integralOptions: IntegralOptions;

  public onSubmit([integral, integralOptions]: [Integral, IntegralOptions]): void {
    this.integral = integral;
    this.integralOptions = integralOptions;
  }
}
