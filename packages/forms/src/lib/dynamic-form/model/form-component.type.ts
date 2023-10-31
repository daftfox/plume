import { IReactiveFormQuestionComponent } from './component/reactive-form-question.component.interface';
import { IFormActionComponent } from './component/form-action.component.interface';
import { IFormQuestionComponent } from './component/form-question.component.interface';
import { IReactiveFormElementComponent } from './component/reactive-form-element.component.interface';
import { IFormGroupComponent } from './component/form-group.component.interface';
import { IFormOutputComponent } from './component/form-output.component.interface';

export type FormComponent =
  | IFormActionComponent
  | IFormOutputComponent
  | IFormGroupComponent
  | IFormQuestionComponent
  | IReactiveFormQuestionComponent
  | IReactiveFormElementComponent;
