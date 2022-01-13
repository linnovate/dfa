import React, { useState, useEffect } from 'react'
import { List, Header, Icon, Segment, Divider, Label } from 'semantic-ui-react';
import { useGlobalState } from "../contexts/GlobalState";
import DamlJsonApi from '../services/DamlJsonApi';

/**
 * React component for the `My Requests` of the `App`.
 */
const MyRequests: React.FC = () => {

  // global states
  const party = DamlJsonApi.party;
  const [requests, setRequests] = useGlobalState('myRequests'); // enable context recycling

  // filter requests
  let items;
  if (requests) {
    items = requests.filter(item =>
      item.payload.disapprovers.length + item.payload.approvers.length < item.payload.parties.length
    )
    .map(item => item.payload).reverse();
  }

  // load requests
  useEffect(() => {
    (async () => {
      
      if (!party) {
        setRequests(null);
      } else {
        const res = await DamlJsonApi.query(["User:FlightRequest"], { user: party });
        setRequests(res.result);
      }
      
    })()
  }, [party])

  // template
  return (
    <Segment className="daml-section">

      <Header as='h2'>
        <Icon name='globe' />
        <Header.Content>
          My Requests
        </Header.Content>
      </Header>

      <Divider />

      <List relaxed className="items">
        { items && items.map((item, key) => (
          <Segment key={item.user + item.flight.timeStart + item.flight.timeEnd}>
            <Label color='blue' ribbon className="label">
              Request
            </Label>
            <List>
              <List.Item>Info: <strong>lat: {item.flight.lat}, lng: {item.flight.lng}, altitude: {item.flight.altitude}</strong></List.Item>
              <List.Item>Time: <strong>{item.flight.timeStart} --> {item.flight.timeEnd}</strong></List.Item>
              <List.Item>Approvers: <strong>{item.approvers.map(i=>i.split("::")[0]).join(', ') || '---'}</strong></List.Item>
              <List.Item>Disapprovers: <strong>{item.disapprovers.map(i=>i.split("::")[0]).join(', ') || '---'}</strong></List.Item>
            </List>
          </Segment>
        ))}
      </List>

    </Segment>
  );
}

export default MyRequests;