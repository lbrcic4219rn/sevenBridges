import { Directive, ElementRef } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';


/** A hero's name can't match the given regular expression */
export function forbiddenNameValidator(value: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const htmlRe = /<(.|\n)*?>/;
    const forbidden = value.match(htmlRe);    
    return forbidden ? {forbiddenName: {value: `nedozvoljen unos ${forbidden[0]}`}} : null;
  };
}

@Directive({
  selector: '[appValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: ValidatorDirective, multi: true}]
})
export class ValidatorDirective implements Validator{  
  constructor( private elRef: ElementRef) { }

  validate(control: AbstractControl): ValidationErrors | null {
    return this.elRef.nativeElement.value ? forbiddenNameValidator(this.elRef.nativeElement.value)(control) : null;
  }

  

}
