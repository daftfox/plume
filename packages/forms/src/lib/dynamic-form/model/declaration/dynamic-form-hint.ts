import { DynamicFormHintOptions, IFormOutput, SPACER } from '../';
import { DynamicFormHintComponent } from '../../component/dynamic-form-hint/dynamic-form-hint.component';

export class DynamicFormHint implements IFormOutput {
  key: string;
  hint?: string;
  heading?: string;
  spacer?: SPACER;
  component = DynamicFormHintComponent;

  constructor(options: DynamicFormHintOptions) {
    this.key = options.key;
    this.hint = options.hint;
    this.heading = options.heading;
    this.spacer = options.spacer;
  }
}
