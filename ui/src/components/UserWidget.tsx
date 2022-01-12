import React, { useState } from 'react';
import { Menu } from 'semantic-ui-react'
import { useGlobalState } from "../contexts/GlobalState";
import DamlJsonApi from '../services/DamlJsonApi';
import LoginScreen from './LoginScreen';

type Props = {
  logoutLink: string,
  requestLink: string,
  approvalLink: string
}

/**
 * React component for the `User Widget` of the `App`.
 */
const UserWidget: React.FC<Props> = ({ logoutLink, requestLink, approvalLink }) => {

  // global states
  const party = DamlJsonApi.party;
  const [, setUser] = useGlobalState('user');

  // local states
  const [showLogin, setShowLogin] = useState(false);

  // login handler
  const onLogin = async () => {
    setUser({});
    // reset data
    setShowLogin(false);
  }

  // logout handler
  const onLogout = () => {
    DamlJsonApi.logout();
    setUser(null);
  }

  // template
  return (
    <Menu icon borderless>

      <Menu.Menu position='right' className='test-select-main-menu'>

        {party &&
          <Menu.Item position='right'>You are logged in as {party}.</Menu.Item>
        }
        {party &&
          <Menu.Item
            position='right'
            active={false}
            className='test-select-log-out'
            onClick={onLogout}
            icon='log out'
          />
        }
        {!party &&
          <Menu.Item
            position='right'
            active={false}
            className='test-select-sign-in'
            onClick={() => setShowLogin(!showLogin)}
            icon='sign in'
          />
        }

      </Menu.Menu>

      {showLogin &&
        <LoginScreen onLogin={onLogin} />
      }

    </Menu>
  );
};

export default UserWidget;
