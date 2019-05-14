import { FormControl, ValidatorFn } from '@angular/forms';

const checkFormulaRegEx = /[^x+\-/* \d]/gi;

export function ValidateFormula(): ValidatorFn {
  return (control: FormControl) => {
    const value = control.value;
    if (value.match(checkFormulaRegEx)) {
      return { invalidFormula: true };
    }
    return null;
  };
}
