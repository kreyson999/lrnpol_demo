export const parseError = (errors: string | string[]) => {
  return `Wystąpił błąd: ${Array.isArray(errors) ? errors.join(', ') : errors}`;
};
