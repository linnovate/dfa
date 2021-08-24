// Copyright (c) 2021 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import React, { useCallback } from 'react'
import { Button, Checkbox, Form, Grid, Header, Segment } from 'semantic-ui-react'
import Credentials, { computeCredentials } from '../Credentials';
import Ledger from '@daml/ledger';
import { User } from '@daml.js/dfa';
import { DeploymentMode, deploymentMode, ledgerId, httpBaseUrl} from '../config';
import { useEffect } from 'react';

type Props = {
  onLogin: (credentials: Credentials) => void;
  setUserType: (isAdmin: Boolean) => void;
}

/**
 * React component for the login screen of the `App`.
 */
const LoginScreen: React.FC<Props> = ({onLogin, setUserType}) => {
  const [username, setUsername] = React.useState('');
  var isAdmin = false;
  const click = () => {
    isAdmin = !isAdmin;
  }
  const login = useCallback(async (credentials: Credentials, isAdmin: Boolean) => {
    try {
      const ledger = new Ledger({token: credentials.token, httpBaseUrl});
      if (isAdmin) {
        if (await ledger.fetchByKey(User.Admin, credentials.party) === null) { // cannot use isAdmin ? User.Admin : User.User for typing issues
          await ledger.create(User.Admin, {adminame: credentials.party});
        }
      } else {
        if (await ledger.fetchByKey(User.User, credentials.party) === null) {
          await ledger.create(User.User, {username: credentials.party, requests: []});
        }
      }
      onLogin(credentials);
      setUserType(isAdmin);
    } catch(error) {
      alert(`Unknown error:\n${error}`);
    }
  }, [onLogin, setUserType]);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    const credentials = computeCredentials(username);
    await login(credentials, isAdmin);
  }

  const handleDablLogin = () => {
    window.location.assign(`https://login.projectdabl.com/auth/login?ledgerId=${ledgerId}`);
  }

  useEffect(() => {
    const url = new URL(window.location.toString());
    const token = url.searchParams.get('token');
    if (token === null) {
      return;
    }
    const party = url.searchParams.get('party');
    if (party === null) {
      throw Error("When 'token' is passed via URL, 'party' must be passed too.");
    }
    url.search = '';
    window.history.replaceState(window.history.state, '', url.toString());
    login({token, party, ledgerId}, isAdmin);
  }, [login, isAdmin]);

  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h1' textAlign='center' size='huge' style={{color: '#223668'}}>
          <Header.Content>
            Distrubuted Flight Approval
          </Header.Content>
        </Header>
        <Form size='large' className='test-select-login-screen'>
          <Segment>
            {deploymentMode !== DeploymentMode.PROD_DABL
            ? <>
                {/* FORM_BEGIN */}
                <Form.Input
                  fluid
                  icon='user'
                  iconPosition='left'
                  placeholder='Username'
                  value={username}
                  className='test-select-username-field'
                  onChange={e => setUsername(e.currentTarget.value)}
                />
                <Checkbox
                  onChange={click}
                  label="I'm an Admin">
                </Checkbox>
                <Button
                  primary
                  fluid
                  className='test-select-login-button'
                  onClick={handleLogin}>
                  Log in
                </Button>
                {/* FORM_END */}
              </>
            : <Button primary fluid onClick={handleDablLogin}>
                Log in with DABL
              </Button>
            }
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

export default LoginScreen;
