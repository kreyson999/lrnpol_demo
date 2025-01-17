export const getLocalImageURL = (thumbnail: File | string) => {
  if (typeof thumbnail === 'string') return thumbnail;
  return URL.createObjectURL(thumbnail);
};
