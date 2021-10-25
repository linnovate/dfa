import React, { useEffect, useState } from 'react';
import DamlLedger from '@daml/react';

import { httpBaseUrl } from '../config';
import Credentials from '../Credentials';

function getSessionStorageOrDefault(key: string, defaultValue: Credentials | undefined) {
  const stored = sessionStorage.getItem(key);
  if (!stored) {
    return defaultValue;
  }
  return JSON.parse(stored);
}

// Create a provider
export default function DamlProvider(props) {

  const [credentials] = useState(getSessionStorageOrDefault('Credentials', undefined));

  return (
    <DamlLedger
      token={credentials?.token}
      party={credentials?.party}
      httpBaseUrl={httpBaseUrl}
    >
      {props.children}
    </DamlLedger>
  );

};
