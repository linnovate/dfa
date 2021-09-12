// Copyright (c) 2021 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import React, { useEffect, useState } from 'react';
import LoginScreen from './LoginScreen';
import MainScreen from './MainScreen';
import DamlLedger from '@daml/react';
import { httpBaseUrl } from '../config';
import Credentials from '../Credentials';


/**
 * React component for the entry point into the application.
 */
// APP_BEGIN

function getSessionStorageOrDefault(key: string, defaultValue: Credentials | string) {
  const stored = sessionStorage.getItem(key);
  if (!stored) {
    return defaultValue;
  }
  return JSON.parse(stored);
}


const App: React.FC = () => {
  const [credentials, setCredentials] = useState(getSessionStorageOrDefault('Credentials', "undefined"));

  useEffect(() => {
    sessionStorage.setItem('Credentials', JSON.stringify(credentials));
  }, [credentials]);

  return credentials !== "undefined"
    ? <DamlLedger
        token={credentials.token}
        party={credentials.party}
        httpBaseUrl={httpBaseUrl}
      >
        <MainScreen onLogout={() => setCredentials("undefined")}/>
      </DamlLedger>
    : <LoginScreen onLogin={setCredentials}/>
}
// APP_END

export default App;
