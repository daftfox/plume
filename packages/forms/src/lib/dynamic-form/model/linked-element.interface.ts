import { MutatorFn } from './mutator-function.interface';

export interface LinkedElement {
  key: string;
  mutators: MutatorFn[];
  label?: string;
}
