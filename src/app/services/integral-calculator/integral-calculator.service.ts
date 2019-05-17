import { Injectable } from '@angular/core';
import {
  Integral,
  IntegralOptions,
  IntegralMethod
} from '@app/entities';
import { Observable } from 'rxjs';
import * as math from 'mathjs';

const ASYNC_THRESHOLD = 1000;
const ASYNC_STEP = ASYNC_THRESHOLD;

@Injectable({
  providedIn: 'root'
})
export class IntegralCalculatorService {

  public $calcIntegral(
    integral: Integral,
    integralOptions: IntegralOptions
  ): Observable<number> {
    const { n, method, isAsync } = integralOptions;
    return new Observable((observer) => {
      // tslint:disable-next-line:no-console
      console.time('calc');
      const cb = setTimeout(() => {
        this.getMethod(method)(integral, n, isAsync)
          .then((result) => {
            observer.next(result);
            observer.complete();
            // tslint:disable-next-line:no-console
            console.timeEnd('calc');
          });
      });

      return () => {
        clearInterval(cb);
      };
    });
  }

  private getMethod(method: IntegralMethod): (integral, n, isAsync) => Promise<number> {
    switch (method) {
      case IntegralMethod.RiemannSum:
        return this.calcRiemannSum.bind(this);
      case IntegralMethod.TrapezoidalRule:
        return this.calcTrapezoidalRule.bind(this);
    }
  }

  private async calcRiemannSum(
    integral: Integral,
    n = 10000,
    isAsync = false
  ): Promise<number> {
    const { from, to, formula } = integral;

    let sSum = 0;
    const step: number = (to - from) / n;
    const useAsync = isAsync && n > ASYNC_THRESHOLD;

    for (let i = 0; i < n; i++) {
      const asyncCalc = useAsync && i % ASYNC_STEP === 0;
      await this.delayCb(() => {
        const x0: number = i * step;
        const x1: number = (i + 1) * step;
        const fx: number = this.countX(formula, x0);
        const s: number = (x1 - x0) * fx;
        sSum += s;
      }, asyncCalc);
    }

    return sSum;
  }

  private async calcTrapezoidalRule(
    integral: Integral,
    n = 10000,
    isAsync = false
  ): Promise<number> {
    const { from, to, formula } = integral;

    let sSum = 0;
    const step: number = (to - from) / n;
    const useAsync = isAsync && n > ASYNC_THRESHOLD;

    for (let i = 0; i < n; i++) {
      const asyncCalc = useAsync && i % ASYNC_STEP === 0;
      await this.delayCb(() => {
        const x0: number = i * step;
        const x1: number = (i + 1) * step;
        const fx0: number = this.countX(formula, x0);
        const fx1: number = this.countX(formula, x1);
        const s: number = (1 / 2) * step * (fx0 + fx1);
        sSum += s;
      }, asyncCalc);
    }

    return sSum;
  }

  private countX(formula, x): number {
    return math.eval(formula, {x});
  }

  private delayCb(cb, isAsync = false): Promise<any> {
    return new Promise((resolve) => {
      if (isAsync) {
        requestAnimationFrame(() => {
          resolve(cb());
        });
      } else {
        resolve(cb());
      }
    });
  }
}
