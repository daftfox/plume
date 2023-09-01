import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[slfFormElementHost]',
  standalone: true
})
export class DynamicFormElementHostDirective {
  constructor( public viewContainerRef: ViewContainerRef ) {}
}
