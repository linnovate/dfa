import React, { useState, useEffect } from 'react'
import { List, Header, Icon, Segment, Divider } from 'semantic-ui-react';
import { useGlobalState } from "../contexts/GlobalState";
import DamlJsonApi from '../services/DamlJsonApi';

/**
 * React component for the `My Approved Requests` of the `App`.
 */
const MyApprovedRequests: React.FC = () => {

  // global states
  const party = DamlJsonApi.party;
  const [user, setUser] = useGlobalState('user');

  // local states
  const [requests, setRequests] = useState();

  // load requests
  useEffect(() => {
    (async () => {
      
      if (!party) {
        setRequests(null);
      } else {
        const res = await DamlJsonApi.query(["User:CompletedRequest"], { user: party });
        const requests = res.result.map(item => item.payload).reverse();
        setRequests(requests);
      }
      
    })()
  }, [party])

  // template
  return (
    <Segment className="daml-section">

      <Header as='h2'>
        <Icon name='globe' />
        <Header.Content>My Approved Requests</Header.Content>
      </Header>

      <Divider />

      <List relaxed className="items">
        { requests && requests.map((item, key) => (
          <Segment key={item.user + item.flight.timeStart + item.flight.timeEnd}>
            <List.Item><strong>{item.flight.timeStart} --> {item.flight.timeEnd}, lat: {item.flight.lat}, lng: {item.flight.lng}, altitude: {item.flight.altitude}</strong></List.Item>
          </Segment>
        ))}
      </List>

    </Segment>
  );
}

export default MyApprovedRequests;