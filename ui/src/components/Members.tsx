import React, { useState, useEffect } from 'react'
import { List, Header, Icon, Segment, Divider } from 'semantic-ui-react';
import { useGlobalState } from "../contexts/GlobalState";
import DamlJsonApi from '../services/DamlJsonApi';

const list = [];
let ws;

/**
 * React component for the `Members` of the `App`.
 */
const Members: React.FC = () => {

  // global states
  const party = DamlJsonApi.party;
  const [user, setUser] = useGlobalState('user'); // enable context recycling

  // local states
  const [items, setItems] = useState();

  // convert members list to groups
  let groups = {};
  if (items) {
    items.forEach(item => {
      groups[item.payload.group] || (groups[item.payload.group] = []);
      groups[item.payload.group].push(item.payload.member.split("::")[0]);
    });
  }

  // load items
  useEffect(() => {
    (async () => {

      if (!party) {
        ws?.close();
        setItems(null);
      } else {
        ws = DamlJsonApi.querySocket(["User:GroupMember"]);
        ws.addEventListener("message", (event) => {
          const isUpdate = DamlJsonApi.messageHandler(event, list);
          isUpdate && setItems([...list]);
        });
      }

    })()
  }, [party])

  // template
  return (
    <Segment className="daml-section">

      <Header as='h2'>
        <Icon name='globe' />
        <Header.Content>
          Members
        </Header.Content>
      </Header>

      <Divider />

      <List relaxed className="items">
        {party && groups && Object.keys(groups).map((group) => (
          <Segment key={group}>
            <List.Item>Group: <strong>{group}</strong></List.Item>
            <List.Item>Members: <strong>{groups[group].join(", ")}</strong></List.Item>
          </Segment>
        ))}
      </List>

    </Segment>
  );
}

export default Members;