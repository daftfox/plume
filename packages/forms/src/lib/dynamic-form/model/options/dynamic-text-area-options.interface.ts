import { DynamicTextOptions } from './dynamic-text-options.interface';

export interface DynamicTextAreaOptions extends DynamicTextOptions<string> {
  rows?: number;
}
