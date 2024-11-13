export type TemplateObject = Record<string, IfCondition | ForLoop | unknown>;
export type Variables = Record<string, unknown>;

// Special directives type //
type ForLoop = {
  $for: {
    collection: string;
    produce: unknown;
  };
};
type IfCondition = {
  $if: string;
  [key: string]: unknown;
};

export type Options = {
  placeholdersLeaveAsIs?: boolean;
  returnType?: 'JSONTextWithSpaces' | 'JSONText' | 'object';
};
// Default options //
export const optionsDefault: Options = {
  placeholdersLeaveAsIs: true, // If there's no variable for a {{something}}, leave it as is
  returnType: 'JSONTextWithSpaces', // Return JSON.stringify(parsed, null, 2) or JSON.stringify(parsed)
};

// Stringify with formatting //
const stringifyWithSpaces = (obj: unknown) => JSON.stringify(obj, null, 2);

// Check if string can be number //
function parseIfNumber(value: unknown) {
  if (value === '' || typeof value !== 'string') {
    return value;
  }
  const parsed = Number(value);
  if (!isNaN(parsed)) {
    return parsed;
  }
  return value;
}

const processTemplate = (templateRaw: string, variablesRaw: Variables = {}, options: Options = optionsDefault) => {
  const placeholdersLeaveAsIs = options.placeholdersLeaveAsIs ?? optionsDefault.placeholdersLeaveAsIs;

  const variablesNotFound: object[] = [];

  // I’m not entirely sure if the Template should always be in JSON format, but looking at the project name and test cases, it seems so. Therefore, checking if the JSON is valid. //
  let template;
  try {
    template = JSON.parse(templateRaw);
  } catch (error) {
    return 'Failed to parse Variables JSON: ' + (error as Error).message;
  }

  // Recursively parses the template //
  const parseTemplate = (template: unknown, variables: Variables): unknown => {
    // Replace variables in strings //
    if (typeof template === 'string') {
      return replaceVariables(template, variables);
    }
    // Process each item in arrays //
    if (Array.isArray(template)) {
      // Process each item //
      return template.flatMap((item) => {
        const parsed = parseTemplate(item, variables);
        return parsed !== undefined ? [parsed] : []; // Skip undefined items
      });
    }
    // Process each item in objects //
    if (typeof template === 'object' && template !== null) {
      const result: TemplateObject = {};
      type Key = keyof typeof template;
      for (const key in template) {
        // Parse special directives //
        const value = template[key as Key];

        // $if condition //
        // Exclude item if condition is false or 'false' (text version) //
        // Leave 0 and '0' as valid conditions, because it can be useful if you use it as a placeholder //
        if (key === '$if') {
          const condition = replaceVariables(value, variables, false);
          if (!condition || condition === '' || condition === 'false') {
            return undefined;
          } else {
            continue; // Skip $if because it's service variable
          }
        }

        // $for loop //
        if (key === '$for') {
          const { collection, produce } = value;
          const variablesLocal = variables[collection];

          // Check that produce is not empty //
          if (!produce) {
            continue;
          }

          // Check that variable exists and is array //
          if (!variablesLocal || !Array.isArray(variablesLocal)) {
            return undefined;
          }
          // Map over the collection //
          return variablesLocal.flatMap((variableLocal: Variables) => {
            const parsed = parseTemplate(produce, variableLocal);
            return parsed !== undefined ? [parsed] : []; // Skip undefined items
          });
        }

        // Leave the key and process each value //
        result[key] = parseTemplate(value, variables);
      }
      return result;
    }
    return template; // Return non-object values as they are
  };

  // Replaces all variable placeholders in a string, e.g., "{{variableName}}" //
  // returnUndefined - return undefined if variable not found //
  const replaceVariables = (str: string, variables: Variables, leaveAsIs?: boolean) => {
    const parsed = str.replace(/\{\{(\w+)}}/g, (_, variable) => {
      // Check that it exists //
      const value = variables[variable];
      if (value === undefined) {
        variablesNotFound.push({ name: variable, where: str });
        return (leaveAsIs ?? placeholdersLeaveAsIs) ? `{{${variable}}}` : '';
      }
      return String(value);
    });
    return parseIfNumber(parsed);
  };

  const parsed = parseTemplate(template, variablesRaw);

  // Here we can catch unused variables //
  // We can return them last, just don't have time to make a proper protocol //
  if (variablesNotFound.length > 0) {
    console.log('Lost variables:', stringifyWithSpaces(variablesNotFound));
  }

  // Return the result in proper format //
  switch (options?.returnType) {
    case 'JSONTextWithSpaces':
      return stringifyWithSpaces(parsed);
    case 'JSONText':
      return JSON.stringify(parsed);
    case 'object':
    default:
      return parsed as object;
  }
};

export default processTemplate;
