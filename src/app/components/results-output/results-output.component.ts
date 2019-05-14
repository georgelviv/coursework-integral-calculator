import {
  Component,
  OnDestroy,
  OnChanges,
  Input
} from '@angular/core';
import { Subscription } from 'rxjs';

import { IntegralCalculatorService } from '@app/services';
import { Integral, IntegralOptions } from '@app/entities';

@Component({
  selector: 'app-results-output',
  templateUrl: 'results-output.component.html',
  styleUrls: [ 'results-output.component.scss' ]
})
export class ResultsOutputComponent implements OnDestroy, OnChanges {

  @Input() integral: Integral;
  @Input() integralOptions: IntegralOptions;

  public result: number;
  public isCounting = false;

  private calculationSubscription: Subscription;

  constructor(
    private integralCalculatorService: IntegralCalculatorService
  ) {}

  public ngOnDestroy(): void {
    this.calculationSubscription.unsubscribe();
  }

  public ngOnChanges(): void {
    if (this.integral && this.integralOptions) {
      this.calculateIntegral();
    }
  }

  private calculateIntegral(): void {
    this.isCounting = true;

    if (this.calculationSubscription) {
      this.calculationSubscription.unsubscribe();
    }

    this.calculationSubscription = this.integralCalculatorService
      .$calcIntegral(this.integral, this.integralOptions)
      .subscribe((result) => {
        this.result = result;
        this.isCounting = false;
      });
  }

  public get displayResult(): boolean {
    return typeof this.result === 'number' && !this.isCounting;
  }
}
