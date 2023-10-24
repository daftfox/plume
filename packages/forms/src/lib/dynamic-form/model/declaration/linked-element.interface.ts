import { MutatorFn } from '../';

export interface LinkedElement {
  key: string;
  mutators: MutatorFn[];
  label?: string;
}
