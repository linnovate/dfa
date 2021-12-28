// Copyright (c) 2021 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import React, { useCallback } from 'react'
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'
import Credentials, { computeCredentials } from '../Credentials';
import Ledger from '@daml/ledger';
import { User } from '@daml.js/dfa';
import { DeploymentMode, deploymentMode, ledgerId, httpBaseUrl } from '../config';
import { useEffect } from 'react';

type Props = {
  onLogin: (credentials: Credentials) => void;
}

/**
 * React component for the login screen of the `App`.
 */
const LoginScreen: React.FC<Props> = ({ onLogin }) => {

  const parties = ["Admin", "Zoolog", "Meteorologist", "Hamal"];
  
  const [party, setParty] = React.useState('');
  const [select, setSelect] = React.useState('');
  
  const login = useCallback(async (credentials: Credentials) => {
    try {
      const ledger = new Ledger({ token: credentials.token, httpBaseUrl });
      if (await ledger.fetchByKey(User.User, credentials.party) === null) {
        await ledger.create(User.User, { username: credentials.party, parties });
      }
      onLogin({ party: credentials.party, token: credentials.token, ledgerId: credentials.ledgerId });
    } catch (error) {
      alert(`Unknown error:\n${error}`);
    }
  }, [onLogin, party, select]);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    const username = (select === "User") ? party : select;
    const credentials = computeCredentials(username);
    await login(credentials);
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
    login({ token, party, ledgerId });
  }, [login]);

  return (
    <Grid className="login-from" textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h1' textAlign='center' size='huge' style={{ color: '#223668' }}>
          <Header.Content>
            Distrubuted Flight Approval
          </Header.Content>
        </Header>
        <Form size='large' className='test-select-login-screen'>
          <Segment>
            {deploymentMode !== DeploymentMode.PROD_DABL
              ? <>
                {/* FORM_BEGIN */}
                <Form.Dropdown
                  fluid
                  search
                  selection
                  className='select-request-receiver'
                  placeholder="Select party"
                  options={[
                  { key: "User", text: "User", value: "User" },
                  { key: "Admin", text: "Admin", value: "Admin" },
                  { key: "Zoolog", text: "Zoolog", value: "Zoolog" },
                  { key: "Meteorologist", text: "Meteorologist", value: "Meteorologist" },
                  { key: "Hamal", text: "Hamal", value: "Hamal" },]}
                  onChange={e => setSelect(e.currentTarget.textContent ?? '')}
                />
                { select === "User" &&
                  <Form.Input
                    fluid
                    icon='user'
                    iconPosition='left'
                    placeholder='Username'
                    className='test-select-username-field'
                    onChange={e => setParty(e.currentTarget.value)}
                  />
                }
                <Button
                  primary
                  fluid
                  className='test-select-login-button'
                  onClick={handleLogin}
                  disabled={!select || select === "User" && !party}>
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