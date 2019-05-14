import { FormControl, ValidatorFn } from '@angular/forms';
import * as math from 'mathjs';

const cyrilicRegEx = /[\u0430-\u044f]/ig;

export function ValidateFormula(): ValidatorFn {
  return (control: FormControl) => {
    const value = control.value;
    const error = { invalidFormula: true };

    if (value.match(cyrilicRegEx)) {
      return error;
    }

    try {
      math.eval(value, {x: 0});
    } catch (e) {
      return error;
    }

    return null;
  };
}
