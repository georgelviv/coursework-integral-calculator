import { Component } from '@angular/core';
import { Integral } from '@app/entities';
import { IntegralCalculatorService } from '@app/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public result: number;

  constructor(
    private integralCalculatorService: IntegralCalculatorService
  ) {}

  public onSubmit(integral: Integral): void {
    this.result = this.integralCalculatorService.calcRiemannSum(integral);
  }
}
