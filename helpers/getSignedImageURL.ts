import { getUrl } from 'aws-amplify/storage';

export const getSignedImageURL = async (imageKey: string) => {
  const signedURL = await getUrl({ key: imageKey });
  return signedURL.url.href;
};
