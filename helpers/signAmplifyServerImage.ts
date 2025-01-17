import { getUrl } from 'aws-amplify/storage/server';
import { runWithAmplifyServerContext } from './runWithAmplifyServerContext';

export const signAmplifyServerImage = async (
  key: string,
  accessLevel: 'guest' = 'guest'
) => {
  const image = await runWithAmplifyServerContext({
    nextServerContext: null,
    operation: (contextSpec) =>
      getUrl(contextSpec, {
        key,
        options: {
          accessLevel: accessLevel,
        },
      }),
  });

  return image.url.href;
};
