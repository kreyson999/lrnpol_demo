'use client';

import { Amplify } from 'aws-amplify';
import configGenerated from '../amplifyconfiguration.json';

const config = {
  ...configGenerated,
};

Amplify.configure(config, {
  ssr: true,
});

export default function ClientSideAmplifyLoader() {
  return null;
}
