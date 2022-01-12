import React, { useState, useEffect, useCallback } from 'react'
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'
import { useGlobalState } from "../contexts/GlobalState";
import DamlJsonApi from '../services/DamlJsonApi';

type Props = {
  onLogin: (credentials: Credentials) => void;
}

/**
 * React component for the login screen of the `App`.
 */
const LoginScreen: React.FC<Props> = ({ onLogin }) => {

  // global states
  const ledgerId = DamlJsonApi.ledgerId;

  // local states
  const [party, setParty] = useState('');
  const [select, setSelect] = useState('');
  const parties = ["Admin", "Zoolog", "Meteorologist", "Hamal"];

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

    // create daml credentials
    const username = (select === "User") ? party : select;
    DamlJsonApi.createCredentials(username);

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

            {select === "User" &&
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
              onClick={simpleLogin}
              disabled={!select || select === "User" && !party}>
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