import React, { useState, useEffect } from 'react'
import { List, Header, Icon, Segment, Divider, Label } from 'semantic-ui-react';
import { useGlobalState } from "../contexts/GlobalState";
import DamlJsonApi from '../services/DamlJsonApi';

const list = [];
let ws;

/**
 * React component for the `My Requests` of the `App`.
 */
const MyRequests: React.FC = () => {

  // global states
  const party = DamlJsonApi.party;
  const [user, setUser] = useGlobalState('user'); // enable context recycling

  // local states
  const [items, setItems] = useState();

  // filter items
  let itemsDiplays;
  if (items) {
    itemsDiplays = items
      .filter(item =>
        item.payload.disapprovers.length + item.payload.approvers.length < item.payload.parties.length
      )
      .map(item => ({ ...item.payload, contractId: item.contractId }))
      .reverse();
  }

  // load items
  useEffect(() => {
    (async () => {

      if (!party) {
        ws?.close();
        setItems(null);
      } else {
        // setup listener 
        ws = DamlJsonApi.querySocket(["User:FlightRequest"], { user: party });
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
          My Requests
        </Header.Content>
      </Header>

      <Divider />

      <List relaxed className="items">
        {itemsDiplays && itemsDiplays.map((item, key) => (
          <Segment key={item.contractId}>
            <Label color='blue' ribbon className="label">
              Request
            </Label>
            <List>
              <List.Item>Info: <strong>lat: {item.flight.lat}, lng: {item.flight.lng}, altitude: {item.flight.altitude}</strong></List.Item>
              <List.Item>Time: <strong>{item.flight.timeStart} --> {item.flight.timeEnd}</strong></List.Item>
              <List.Item>Approvers: <strong>{item.approvers.map(i => i.split("::")[0]).join(', ') || '---'}</strong></List.Item>
              <List.Item>Disapprovers: <strong>{item.disapprovers.map(i => i.split("::")[0]).join(', ') || '---'}</strong></List.Item>
            </List>
          </Segment>
        ))}
      </List>

    </Segment>
  );
}

export default MyRequests;