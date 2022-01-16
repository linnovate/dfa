import React, { useState, useEffect } from 'react'
import { List, Header, Icon, Segment, Divider } from 'semantic-ui-react';
import { useGlobalState } from "../contexts/GlobalState";
import DamlJsonApi from '../services/DamlJsonApi';

/**
 * React component for the `Parteis` of the `App`.
 */
const Parteis: React.FC = () => {

  // global states
  const party = DamlJsonApi.party;
  const [user, setUser] = useGlobalState('user'); // enable context recycling

  // local states
  const [parteis, setParteis] = useState();

  // load users
  useEffect(() => {
    (async () => {

      if (!party) {
        setParteis(null);
      } else {
        const parteis = await DamlJsonApi.getParteis();
        setParteis(parteis);
      }

    })()
  }, [party])

  // template
  return (
    <Segment className="daml-section">

      <Header as='h2'>
        <Icon name='globe' />
        <Header.Content>
          Parteis
        </Header.Content>
      </Header>

      <Divider />

      <List relaxed className="items">
        {party && parteis && parteis.map((item, key) => (
          <Segment key={item.identifier}>
            <List.Item>Display name: <strong>{item.displayName}</strong></List.Item>
            <List.Item>Identifier: <strong>{item.identifier}</strong></List.Item>
            <List.Item>Is local: <strong>{item.isLocal ? 'yes' : 'no'}</strong></List.Item>
          </Segment>
        ))}
      </List>

    </Segment>
  );
}

export default Parteis;