import { FormControl, ValidatorFn } from '@angular/forms';

const checkFormulaRegEx = /[^x+\-/* ]/gi;

export function ValidateFormula(): ValidatorFn {
  return (control: FormControl) => {
    const value = control.value;
    if (value.match(checkFormulaRegEx)) {
      return { invalidFormula: true };
    }
    return null;
  };
}
