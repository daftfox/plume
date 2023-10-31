import { DynamicFormHintComponent } from '../../component/dynamic-form-hint/dynamic-form-hint.component';
import { SPACER } from './spacer.enum';
import { IFormOutput } from './form-output.interface';
import { DynamicFormHintOptions } from '../options/dynamic-form-hint-options.interface';

export class DynamicFormHint implements IFormOutput {
  key: string;
  hint?: string;
  heading?: string;
  spacer?: SPACER;
  component = DynamicFormHintComponent;
  inputKeys: ['key', 'hint', 'heading', 'spacer'];

  constructor(options: DynamicFormHintOptions) {
    this.key = options.key;
    this.hint = options.hint;
    this.heading = options.heading;
    this.spacer = options.spacer;
  }
}
