import { IDynamicFormService } from '../model/service/dynamic-form.service.interface';
import { DynamicFormElementValueType } from '../model/dynamic-form-values.interface';
import { IReactiveFormElementComponent } from '../model/component/reactive-form-element.component.interface';
import { MutatorFn } from '../model/declaration/mutator-function.interface';

export const refreshDataSource: MutatorFn = (
  originKey: string,
  targetKey: string,
  service: IDynamicFormService,
  value?: DynamicFormElementValueType,
) => {
  const linkedElement = service.getFormComponent(targetKey);
  if (!Object.prototype.hasOwnProperty.call(linkedElement, 'dataSource')) {
    throw new Error(
      `Unable to refresh. Linked element ${targetKey} does not extend AbstractReactiveFormQuestionComponent or AbstractReactiveFormElementComponent.`,
    );
  }

  (linkedElement as IReactiveFormElementComponent).refresh(
    new Map([[originKey, value]]),
  );
};
