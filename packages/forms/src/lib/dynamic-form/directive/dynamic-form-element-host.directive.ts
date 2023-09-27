import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[plumeFormElementHost]',
  standalone: true
})
export class DynamicFormElementHostDirective {
  constructor( public viewContainerRef: ViewContainerRef ) {}
}
