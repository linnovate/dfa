import React, { useState, useEffect } from 'react'
import { List, Header, Icon, Segment, Divider } from 'semantic-ui-react';
import { useGlobalState } from "../contexts/GlobalState";
import DamlJsonApi from '../services/DamlJsonApi';

const list = [];
let ws;

/**
 * React component for the `My Approved Requests` of the `App`.
 */
const MyApprovedRequests: React.FC = () => {

  // global states
  const party = DamlJsonApi.party;
  const [user, setUser] = useGlobalState('user'); // enable context recycling

  // local states
  const [items, setItems] = useState();

  // filter items
  let itemsDiplays;
  if (items) {
    itemsDiplays = items.map(item => ({ ...item.payload, contractId: item.contractId })).reverse();
  }

  // load items
  useEffect(() => {
    (async () => {

      if (!party) {
        ws?.close();
        setItems(null);
      } else {
        // setup listener 
        ws = DamlJsonApi.querySocket(["User:CompletedRequest"], { user: party });
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
        <Header.Content>My Approved Requests</Header.Content>
      </Header>

      <Divider />

      <List relaxed className="items">
        {itemsDiplays && itemsDiplays.map((item, key) => (
          <Segment key={item.contractId}>
            <List.Item>Time: <strong>{new Date(item.flight.timeStart).toLocaleString()} -> {new Date(item.flight.timeEnd).toLocaleString()}</strong></List.Item>
            <List.Item>Info: <strong>lat: {item.flight.lat} | lng: {item.flight.lng} | altitude: {item.flight.altitude}</strong></List.Item>
          </Segment>
        ))}
      </List>

    </Segment>
  );
}

export default MyApprovedRequests;