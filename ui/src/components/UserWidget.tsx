import React, { useState } from 'react';
import { Menu } from 'semantic-ui-react'
import { useGlobalState } from "../contexts/GlobalState";

import LoginScreen from './LoginScreen';

type Props = {
}

const UserWidget: React.FC<Props> = () => {
      
    const [showLogin, setShowLogin] = useState(false);

    const [user, setUser] = useGlobalState('user');

    const clickToLogin = (data) => {
        setShowLogin(true);
    }

    const onLogin = (credentials) => {
        sessionStorage.setItem('Credentials', JSON.stringify(credentials));
        setUser(credentials);
        setShowLogin(false);
    }

    const onLogout = () => {
        sessionStorage.removeItem('Credentials');
        setUser(null);
    }

    return (
        <Menu icon borderless>
            <Menu.Menu position='right' className='test-select-main-menu'>
                { user &&
                    <Menu.Item position='right'>You are logged in as {user.party}.</Menu.Item>
                }
                { user &&
                    <Menu.Item
                        position='right'
                        active={false}
                        className='test-select-log-out'
                        onClick={onLogout}
                        icon='log out'
                    />
                }
                { !user &&
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
