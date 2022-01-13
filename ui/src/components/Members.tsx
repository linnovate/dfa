import React, { useState, useEffect } from 'react'
import { List, Header, Icon, Segment, Divider } from 'semantic-ui-react';
import { useGlobalState } from "../contexts/GlobalState";
import DamlJsonApi from '../services/DamlJsonApi';

/**
 * React component for the `Members` of the `App`.
 */
const Members: React.FC = () => {

  // global states
  const party = DamlJsonApi.party;
  const [members, setMembers] = useGlobalState('members'); // enable context recycling

  // convert members list to groups
  let groups = {};
  if (members) {
    members.forEach(item => {
      groups[item.payload.group] || (groups[item.payload.group] = []);
      groups[item.payload.group].push(item.payload.member.split("::")[0]);
    });
  }

  // load members
  useEffect(() => {
    (async () => {
      
      if (!party) {
        setMembers(null);
      } else {
        const res = await DamlJsonApi.query(["User:GroupMember"]);
        setMembers(res.result);
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