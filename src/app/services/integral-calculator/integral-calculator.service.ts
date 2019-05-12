import { Injectable } from '@angular/core';
import { Integral } from '@app/entities';

@Injectable({
  providedIn: 'root'
})
export class IntegralCalculatorService {
  public calcRiemannSum(integral: Integral, n = 10000): number {
    const { from, to, formula } = integral;

    let s = 0;
    const step: number = (to - from) / n;

    for (let i = 0; i < n; i++) {
      const x0: number = i * step;
      const x1: number = (i + 1) * step;
      const normalizedFormula: string = this.normalizeFormula(formula, x0);
      // tslint:disable-next-line:no-eval
      const x = eval(normalizedFormula);
      const f: number = (x1 - x0) * x;
      s += f;
    }

    return s;
  }

  private normalizeFormula(formula, x): string {
    return formula.replace(/x/gi, x);
  }
}