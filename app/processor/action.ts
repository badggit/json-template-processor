'use server';

import { variables as variablesDefault } from '@/app/variables';
import processTemplate from '@/lib/templateProcessor';

const process = async (_previousState: string, formData: FormData): Promise<string> => {
  // Check input data //
  const template = formData.get('template');
  if (typeof template !== 'string') {
    return 'Invalid template';
  }
  if (!template.length) {
    return 'Empty template';
  }

  // I would have created a `process(template: object, variables: object)` function, but since you might have some tests relying on the current structure, I left it as is. If nothing comes from the web form, the default values are used. //
  let variablesParsed;
  const variables = formData.get('variables');
  if (typeof variables !== 'string') {
    return 'Invalid variables';
  }
  if (!variables.length) {
    variablesParsed = variablesDefault;
  } else {
    try {
      variablesParsed = JSON.parse(variables);
    } catch (error) {
      return 'Failed to parse Variables JSON: ' + (error as Error).message;
    }
  }

  try {
    // Process template //
    return String(processTemplate(template, variablesParsed, { returnType: 'JSONTextWithSpaces' }));
  } catch (error) {
    return 'Failed to process: ' + (error as Error).message;
  }
};

export default process;
