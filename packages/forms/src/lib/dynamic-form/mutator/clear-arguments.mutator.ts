import { MutatorFn } from '../model/declaration/mutator-function.interface';
import { IReactiveFormElementComponent } from '../model/component/reactive-form-element.component.interface';
import { IDynamicFormService } from '../model/service/dynamic-form.service.interface';
import { DynamicFormElementValueType } from '../model/dynamic-form-values.interface';

export const clearArguments: MutatorFn = (
  originKey: string,
  targetKey: string,
  service: IDynamicFormService,
  _value?: DynamicFormElementValueType,
) => {
  const linkedElement = service.getFormComponent(targetKey);

  if (!Object.prototype.hasOwnProperty.call(linkedElement, 'dataSource')) {
    throw new Error(
      `Unable to clear arguments. Linked element ${targetKey} does not extend AbstractReactiveFormQuestionComponent or AbstractReactiveFormElementComponent.`,
    );
  }

  (linkedElement as IReactiveFormElementComponent).clearArgs();
};
