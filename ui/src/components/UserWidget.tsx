import React, { useEffect, useState } from 'react';
import { Menu } from 'semantic-ui-react'

import LoginScreen from './LoginScreen';

type Props = {
}

function getSessionStorageOrDefault(key: string, defaultValue: Credentials | undefined) {
  const stored = sessionStorage.getItem(key);
  if (!stored) {
    return defaultValue;
  }
  return JSON.parse(stored);
}

const UserWidget: React.FC<Props> = () => {
      
    const [credentials, setCredentials] = useState(getSessionStorageOrDefault('Credentials', undefined));

    const [showLogin, setShowLogin] = useState(false);

    const party = credentials?.party;
    
    const clickToLogin = (data) => {
        setShowLogin(true);
    }

    const onLogin = (credentials) => {
        setCredentials(credentials);
        setShowLogin(false);
        window.location.reload();
    }

    const onLogout = () => {
        sessionStorage.removeItem('Credentials');
        window.location.reload();
    }

    useEffect(() => {
        sessionStorage[credentials ? 'setItem' : 'removeItem']('Credentials', JSON.stringify(credentials));
    }, [credentials]);
  
    return (
        <Menu icon borderless>
            <Menu.Menu position='right' className='test-select-main-menu'>
                { party &&
                    <Menu.Item position='right'>You are logged in as {party}.</Menu.Item>
                }
                { party &&
                    <Menu.Item
                        position='right'
                        active={false}
                        className='test-select-log-out'
                        onClick={onLogout}
                        icon='log out'
                    />
                }
                { !party &&
                    <Menu.Item
                        position='right'
                        active={false}
                        className='test-select-sign-in'
                        onClick={clickToLogin}
                        icon='sign in'
                    />
                }
            </Menu.Menu>
            { showLogin && <LoginScreen onLogin={onLogin} /> }
        </Menu>
    );
};

export default UserWidget;
