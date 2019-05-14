import {
  Component,
  OnDestroy,
  OnChanges,
  Input,
  Output,
  EventEmitter
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

  @Output() isComputingChange: EventEmitter<boolean> = new EventEmitter<boolean>();

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
    this.changeIsCounting(true);

    if (this.calculationSubscription) {
      this.calculationSubscription.unsubscribe();
    }

    this.calculationSubscription = this.integralCalculatorService
      .$calcIntegral(this.integral, this.integralOptions)
      .subscribe((result) => {
        this.result = result;
        this.changeIsCounting(false);
      });
  }

  private changeIsCounting(isCounting: boolean): void {
    this.isCounting = isCounting;
    setTimeout(() => {
      this.isComputingChange.emit(this.isCounting);
    });
  }

  public get displayResult(): boolean {
    return typeof this.result === 'number' && !this.isCounting;
  }
}
