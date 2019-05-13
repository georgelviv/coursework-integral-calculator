import { Component, OnDestroy } from '@angular/core';
import { Integral } from '@app/entities';
import { IntegralCalculatorService } from '@app/services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {

  public result: number;
  public isCounting = false;

  private subscriptions: Subscription[] = [];

  constructor(
    private integralCalculatorService: IntegralCalculatorService
  ) {}

  public ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

  public onSubmit([integral, n]: [Integral, number]): void {
    this.isCounting = true;

    const calculationSubscription: Subscription = this.integralCalculatorService
      .$calcRiemannSum(integral, n)
      .subscribe((result) => {
        this.result = result;
        this.isCounting = false;
      });

    this.subscriptions.push(calculationSubscription);
  }

  public get displayResult(): boolean {
    return typeof this.result === 'number' && !this.isCounting;
  }
}
