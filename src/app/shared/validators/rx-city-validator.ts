import { ValidatorFn, AbstractControl } from '@angular/forms';

export function validateCity(validCities: string[]): ValidatorFn {
    return (control: AbstractControl) => {
        if (control.value && validCities.indexOf(control.value) === -1) {
            return {
                city: {
                    actualValue: control.value,
                    validCities
                }
            };
        }
    };
}