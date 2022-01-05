import React, { useState, useEffect } from 'react'
import { List, Header, Icon, Segment, Divider, Label } from 'semantic-ui-react';
import { useGlobalState } from "../contexts/GlobalState";
import DamlJsonApi from '../services/DamlJsonApi';

/**
 * React component for the `All Requests` of the `App`.
 */
const AllRequests: React.FC = () => {

  // global states
  const party = DamlJsonApi.party;
  const [user, setUser] = useGlobalState('user');

  // local states
  const [requests, setRequests] = useState(null);
  
  // load requests
  useEffect(() => {
    (async () => {
      
      if (!party) {
        setRequests(null);
      } else {
      
        const res = await DamlJsonApi.query(["User:FlightRequest"]);
        const resCompleted = await DamlJsonApi.query(["User:CompletedRequest"])
    
        const itemsRequest = res.result.map(item => item.payload).reverse();
        const itemsCompleted = resCompleted.result.map(item => item.payload).reverse();
    
        const items = [...itemsRequest, ...itemsCompleted];
        items.sort((a, b) => new Date(a.flight.time).getTime() - new Date(b.flight.time).getTime())
    
        setRequests(items);
      }
      
    })()
  }, [party])
  
  // template
  return (
    <Segment className="daml-section">

      <Header as='h2'>
        <Icon name='globe' />
        <Header.Content>All Requests</Header.Content>
      </Header>

      <Divider />

      <List relaxed className="items">
        { requests && requests.map((item, key) => (
          <Segment key={item.user + item.flight.timeStart + item.flight.timeEnd}>
            {(item.approvers.length === item.parties.length) ?
              <Label color='green' ribbon className="label">
                Approve
              </Label>
              :
              <Label color='blue' ribbon className="label">
                Request
              </Label>
            }
            <List.Item>Info: <strong>lat: {item.flight.lat}, lng: {item.flight.lng}, altitude: {item.flight.altitude}</strong></List.Item>
            <List.Item>Time: <strong>{item.flight.timeStart} --> {item.flight.timeEnd}</strong></List.Item>
            <List.Item>Approvers: <strong>{item.approvers.join(', ') || '---'}</strong></List.Item>
            <List.Item>Disapprovers: <strong>{item.disapprovers.join(', ') || '---'}</strong></List.Item>
            <List.Item>User: <strong>{item.user}</strong></List.Item>
          </Segment>
        ))}
      </List>

    </Segment>
  );
}

export default AllRequests;