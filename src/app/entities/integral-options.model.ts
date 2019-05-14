import {
  IntegralMethod
} from './integral-method.enum';

export interface IntegralOptions {
  n: number;
  method: IntegralMethod;
  isAsync: boolean;
}
