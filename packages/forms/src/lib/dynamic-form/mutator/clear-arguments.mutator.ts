import {
  DynamicFormElementValueType,
  IDynamicFormService,
  IReactiveFormElementComponent,
  MutatorFn,
} from '../model';

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
