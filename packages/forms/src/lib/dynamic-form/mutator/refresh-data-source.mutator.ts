import { IDynamicFormService } from '../model/service/dynamic-form.service.interface';
import { DynamicFormElementValueType, MutatorFn } from '../model';
import { AbstractReactiveFormQuestionComponent } from '../component/abstract-reactive-form-question/abstract-reactive-form-question.component';
import { AbstractReactiveFormElementComponent } from '../component/abstract-reactive-form-element/abstract-reactive-form-element.component';

export const refreshDataSource: MutatorFn = (
  originKey: string,
  targetKey: string,
  service: IDynamicFormService,
  value?: DynamicFormElementValueType,
) => {
  const linkedElement = service.getFormComponent(targetKey);

  if (
    !(linkedElement instanceof AbstractReactiveFormElementComponent) &&
    !(linkedElement instanceof AbstractReactiveFormQuestionComponent)
  ) {
    throw new Error(
      `Linked element ${targetKey} does not extend AbstractReactiveFormQuestionComponent or AbstractReactiveFormElementComponent.`,
    );
  }

  (linkedElement as AbstractReactiveFormElementComponent<unknown>).refresh(
    new Map([[originKey, value]]),
  );
};
