import {
  AbstractFormGroupComponent,
  AbstractFormQuestionComponent,
  AbstractReactiveFormElementComponent,
  AbstractReactiveFormQuestionComponent,
} from '@plume-org/forms';

export type FormComponent =
  | AbstractFormGroupComponent
  | AbstractFormQuestionComponent
  | AbstractReactiveFormQuestionComponent<unknown>
  | AbstractReactiveFormElementComponent<unknown>;
