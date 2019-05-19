import { IntegralCalculatorService } from './integral-calculator.service';
import { async } from '@angular/core/testing';
import {
  Integral,
  IntegralOptions,
  IntegralMethod
} from '@app/entities';

describe('IntegralCalculatorService', () => {
  let service: IntegralCalculatorService;
  beforeEach(() => {
    service = new IntegralCalculatorService();
  });

  it('should calculate properly integral', async(() => {
    const integral: Integral = {
      from: 0,
      to: 10,
      formula: 'x^2'
    };
    const integralOptions: IntegralOptions = {
      n: 10,
      method: IntegralMethod.TrapezoidalRule,
      isAsync: true
    };

    service.$calcIntegral(integral, integralOptions)
      .subscribe((result) => {
        expect(result).toBe(335);
      });
  }));

});
