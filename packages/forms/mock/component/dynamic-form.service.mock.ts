import { DynamicFormService, FormComponentModel } from '../../src';

const formComponentsMap = new Map<string, FormComponentModel>();

export const mockDynamicFormService = {
  getFormComponent: (key: string) => formComponentsMap.get(key).componentRef,
} as unknown as DynamicFormService;
