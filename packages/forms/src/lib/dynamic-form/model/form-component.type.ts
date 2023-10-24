import {
  IFormActionComponent,
  IFormGroupComponent,
  IFormOutputComponent,
  IFormQuestionComponent,
  IReactiveFormElementComponent,
  IReactiveFormQuestionComponent,
} from './component';

export type FormComponent =
  | IFormActionComponent
  | IFormOutputComponent
  | IFormGroupComponent
  | IFormQuestionComponent
  | IReactiveFormQuestionComponent
  | IReactiveFormElementComponent;
