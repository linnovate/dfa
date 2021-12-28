import React, { useState } from 'react';
import { Menu } from 'semantic-ui-react'
import { User } from '@daml.js/dfa';
import { useParty, useLedger } from '@daml/react';
import { useGlobalState } from "../contexts/GlobalState";

import LoginScreen from './LoginScreen';

type Props = {
    requestLink: string,
    approvalLink: string
}

const UserWidget: React.FC<Props> = ({ logoutLink, requestLink, approvalLink }) => {

    const [showLogin, setShowLogin] = useState(false);
    const [user, setUser] = useGlobalState('user');
    const ledger = useLedger();
    const party = useParty();

    const clickToLogin = () => {
        setShowLogin(!showLogin);
    }

    const onLogin = async (credentials: object) => {
        sessionStorage.setItem('Credentials', JSON.stringify(credentials));
        setUser(credentials);
        setShowLogin(false);
        // const memebers = await ledger.query(User.GroupMember);
        // const memeber = memebers.find(item => item.key = credentials.party);
        // window.location.href = (memeber === 'User' ? requestLink : approvalLink);
    }

    const onLogout = () => {
        sessionStorage.removeItem('Credentials');
        setUser(null);
        window.location.href = logoutLink;
    }
    
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
                        onClick={clickToLogin}
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
