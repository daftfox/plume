import {
  ChangeDetectorRef,
  Component,
  EnvironmentInjector,
  Input,
  OnInit,
  Optional,
  Output,
  SkipSelf,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Subject } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AbstractFormGroupComponent } from '../abstract-form-group/abstract-form-group.component';
import { CommonModule, NgIf } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { DynamicFormService } from '../../service/dynamic-form.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'plume-dynamic-form-group',
  templateUrl: './dynamic-form-group.component.html',
  styleUrls: ['./dynamic-form-group.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    MatBadgeModule,
    MatIconModule,
    NgIf,
    ReactiveFormsModule,
    MatButtonModule,
  ],
})
export class DynamicFormGroupComponent
  extends AbstractFormGroupComponent
  implements OnInit
{
  @Input() showControls = false;
  @Input() disabled = false;
  @Input() submitButtonLabel = 'Submit';
  @Input() submitButtonIcon: string;
  @Input() submitButtonBadgeLabel: string | number;
  @Input() cancelButtonLabel = 'Cancel';
  @Input() direction: 'column' | 'row' = 'column';

  @Output() formSubmit = new Subject();
  @Output() formCancel = new Subject<null>();

  @ViewChild('formOutlet', { read: ViewContainerRef })
  protected override formOutlet: ViewContainerRef;

  constructor(
    protected override cdRef: ChangeDetectorRef,

    // Only used by root node form group to create an EnvironmentInjector to be shared with downstream components
    protected override injector: EnvironmentInjector,

    // Don't look for the DynamicFormService provider in the current ElementInjector
    @SkipSelf() @Optional() protected override service: DynamicFormService,
  ) {
    super(cdRef, injector, service);
    this.initService();
  }

  override ngOnInit() {
    super.ngOnInit();
  }

  /**
   * Wrapper method to emit new form values on submit
   */
  submit(): void {
    this.formSubmit.next(this.form.getRawValue());
  }

  cancel(): void {
    this.formCancel.next(null);
  }
}
