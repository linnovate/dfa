import React, { useState, useEffect, useCallback } from 'react'
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'
import { useGlobalState } from "../contexts/GlobalState";
import DamlJsonApi from '../services/DamlJsonApi';

/**
 * React component for the login screen of the `App`.
 */
const LoginScreen: React.FC = ({ ledgerId, onLogin }) => {

  // local states
  const [party, setParty] = useState('');

  // oauth2 handler
  const oauth2Login = () => {
    // window.location.assign(`https://login.projectdabl.com/auth/login?ledgerId=${ledgerId}`);
  }

  // oauth2 callback handler
  const url = new URL(window.location.toString());
  const token = url.searchParams.get('token');
  if (token) {
    // const party = url.searchParams.get('party');
    // if (party === null) {
    //   throw Error("When 'token' is passed via URL, 'party' must be passed too.");
    // }
    // url.search = '';
    // window.history.replaceState(window.history.state, '', url.toString());
    // ...
    // onLogin();
  }

  // login handler
  const simpleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    DamlJsonApi.createCredentials(ledgerId, party);
    onLogin();
  }

  // template
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

            <Form.Input
              fluid
              icon='user'
              iconPosition='left'
              placeholder='Username'
              className='test-select-username-field'
              onChange={e => setParty(e.currentTarget.value)}
            />

            <Button
              primary
              fluid
              className='test-select-login-button'
              onClick={simpleLogin}
              disabled={!party}>
              Log in
            </Button>

          </Segment>

        </Form>

      </Grid.Column>

    </Grid>
  );
};

export default LoginScreen;

         // <Button primary fluid onClick={oauth2Login}>
         //        Log in with DABL
         //      </Button>