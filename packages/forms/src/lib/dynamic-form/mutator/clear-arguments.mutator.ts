import { DynamicFormService } from '../service/dynamic-form.service';
import { DynamicFormElementValueType, MutatorFn } from '../model';
import { AbstractReactiveFormQuestionComponent } from '../component/abstract-reactive-form-question/abstract-reactive-form-question.component';
import { AbstractReactiveFormElementComponent } from '../component/abstract-reactive-form-element/abstract-reactive-form-element.component';

export const clearArguments: MutatorFn = <T = DynamicFormElementValueType>(
  originKey: string,
  targetKey: string,
  service: DynamicFormService,
  value?: T,
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

  (linkedElement as AbstractReactiveFormElementComponent<unknown>).clearArgs();
};
