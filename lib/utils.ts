export const underscoreToSpace = (str: string) => {
  return str.replace(/_/g, ' ');
};

export const stringifyWithSpaces = (obj: unknown) => JSON.stringify(obj, null, 2);
