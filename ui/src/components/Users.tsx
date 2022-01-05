import React, { useState } from 'react'
import { List, Header, Icon, Segment, Divider } from 'semantic-ui-react';
import { useGlobalState } from "../contexts/GlobalState";
import DamlJsonApi from '../services/DamlJsonApi';

/**
 * React component for the `Users` of the `App`.
 */
const Users: React.FC = () => {

  // global states
  const party = DamlJsonApi.party;
  const [user, setUser] = useGlobalState('user');

  // local states
  const [users, setUsers] = useState();

  // load users
  if (!users && party) {
    DamlJsonApi.query(["User:User"]).then(res => {

      const users = res.result
        .map(item => item.payload);

      setUsers(users);

    });
  }

  // template
  return (
    <Segment className="daml-section">

      <Header as='h2'>
        <Icon name='globe' />
        <Header.Content>
          Users
        </Header.Content>
      </Header>

      <Divider />

      <List relaxed className="items">
        {party && users && users.map((item, key) => (
          <Segment key={item.username}>
            <List.Item>Name: <strong>{item.username}</strong></List.Item>
          </Segment>
        ))}
      </List>

    </Segment>
  );
}

export default Users;