import { Sha256 } from '@aws-crypto/sha256-js';
import { SignatureV4 } from '@aws-sdk/signature-v4';
import { HttpRequest } from '@aws-sdk/protocol-http';
import { default as fetch, Request } from 'node-fetch';

import config from '@/amplifyconfiguration.json';

export const makeSignedAppSyncRequest = async (
  body: string,
  method: string = 'POST'
) => {
  const signer = new SignatureV4({
    credentials: {
      accessKeyId: process.env.NEXT_AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.NEXT_AWS_SECRET_ACCESS_KEY!,
    },
    region: config.aws_appsync_region,
    service: 'appsync',
    sha256: Sha256,
  });

  const { host, pathname } = new URL(config.aws_appsync_graphqlEndpoint);

  const requestToBeSigned = new HttpRequest({
    method,
    headers: {
      'Content-Type': 'application/json',
      host,
    },
    hostname: host,
    body,
    path: pathname,
  });

  const signedRequest = await signer.sign(requestToBeSigned);

  const request = new Request(
    config.aws_appsync_graphqlEndpoint,
    signedRequest
  );

  const stepResponse = await fetch(request);

  return stepResponse;
};
