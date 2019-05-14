import { Injectable } from '@angular/core';
import {
  Integral,
  IntegralOptions,
  IntegralMethod
} from '@app/entities';
import { Observable } from 'rxjs';
import * as math from 'mathjs';

@Injectable({
  providedIn: 'root'
})
export class IntegralCalculatorService {

  public $calcIntegral(
    integral: Integral,
    integralOptions: IntegralOptions
  ): Observable<number> {
    const { n, method } = integralOptions;
    return new Observable((observer) => {
      const cb = setTimeout(() => {
        const result = this.getMethod(method)(integral, n);
        observer.next(result);
        observer.complete();
      });

      return () => {
        clearInterval(cb);
      };
    });
  }

  private getMethod(method: IntegralMethod): (integral, n) => number {
    switch (method) {
      case IntegralMethod.RiemannSum:
        return this.calcRiemannSum.bind(this);
      case IntegralMethod.TrapezoidalRule:
        return this.calcTrapezoidalRule.bind(this);
    }
  }

  private calcRiemannSum(integral: Integral, n = 10000): number {
    const { from, to, formula } = integral;

    let sSum = 0;
    const step: number = (to - from) / n;

    for (let i = 0; i < n; i++) {
      const x0: number = i * step;
      const x1: number = (i + 1) * step;
      const fx: number = this.countX(formula, x0);
      const s: number = (x1 - x0) * fx;
      sSum += s;
    }

    return sSum;
  }

  private calcTrapezoidalRule(integral: Integral, n = 10000): number {
    const { from, to, formula } = integral;

    let sSum = 0;
    const step: number = (to - from) / n;

    for (let i = 0; i < n; i++) {
      const x0: number = i * step;
      const x1: number = (i + 1) * step;
      const fx0: number = this.countX(formula, x0);
      const fx1: number = this.countX(formula, x1);
      const s: number = (1 / 2) * step * (fx0 + fx1);
      sSum += s;
    }

    return sSum;
  }

  private countX(formula, x): number {
    return math.eval(formula, {x});
  }
}
