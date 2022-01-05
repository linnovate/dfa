import React, { useState } from 'react';
import DamlLedger from '@daml/react';
import { useGlobalState } from "./GlobalState";
import { httpBaseUrl } from '../config';
import Credentials from '../Credentials';

// Create a provider
export default function DamlProvider(props) {

  const credentials = JSON.parse(sessionStorage.getItem('Credentials') || '{}');

  const [user, setUser] = useGlobalState('user');

  if (!user && credentials.token) {
    setUser(credentials);
  }

  return (<DamlLedger token={credentials.token}
    party={credentials.party}
    httpBaseUrl={httpBaseUrl} > {props.children} </DamlLedger>
  );

};