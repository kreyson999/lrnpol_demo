export const getStepProgress = (
  userProgress: number | null,
  duration: number
) => {
  if (!userProgress) return 0;

  const progress = Math.ceil((userProgress / duration) * 100);

  return progress > 100 ? 100 : progress;
};
