export const getFormattedDuration = (ms: number) => {
  return new Date(ms).toISOString().slice(14, 19);
};
