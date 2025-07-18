import { AbstractControl, FormGroup } from "@angular/forms";

export class ValidatorField {
  static MustMatch(controlName: string, matchingControlName: string) : any{
    return (group: AbstractControl) => {
      const formGroup = group as FormGroup;
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if(matchingControl?.errors && !matchingControl.errors.mustMatch) {
        return null;
      }

      if(control.value !== matchingControl.value) {
        return matchingControl.setErrors({ mustMatch: true });
      }
      matchingControl.setErrors(null);
    };
  }
}
