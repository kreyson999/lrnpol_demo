import { getSignedCookies } from '@aws-sdk/cloudfront-signer';
import { cookies } from 'next/headers';

export const setVideoStepCookies = (url: string) => {
  const dateLessThan = new Date(Date.now() + 1000 * 60 * 60 * 6).getTime();

  const resource = `${url.split('/').slice(0, -1).join('/')}/*`;

  const policyStr = JSON.stringify({
    Statement: [
      {
        Resource: resource,
        Condition: {
          DateLessThan: {
            'AWS:EpochTime': dateLessThan,
          },
        },
      },
    ],
  });

  const privateKeyStart = '-----BEGIN PRIVATE KEY-----';
  const privateKeyEnd = '-----END PRIVATE KEY-----';

  const privateKey = process.env
    .NEXT_AWS_CLOUDFRONT_PRIVATE_KEY!.replace(privateKeyStart, '')
    .replace(privateKeyEnd, '')
    .trim()
    .replace(/ /g, '\n');

  const newPrivateKey = `${privateKeyStart}\n${privateKey}\n${privateKeyEnd}`;


  const signedCookies = getSignedCookies({
    policy: policyStr,
    privateKey: newPrivateKey,
    keyPairId: process.env.NEXT_AWS_CLOUDFRONT_KEY_PAIR_ID!,
  });

  const defaultCookieOptions = {
    secure: true,
    domain: 'learnpool.pl',
    path: '/',
    httpOnly: true,
  };

  Object.entries(signedCookies).forEach(([key, value]) => {
    cookies().set(key, value as string, defaultCookieOptions);
  });
};
