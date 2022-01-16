import React, { useState, useEffect } from 'react'
import { List, Header, Icon, Segment, Divider, Label } from 'semantic-ui-react';
import { useGlobalState } from "../contexts/GlobalState";
import DamlJsonApi from '../services/DamlJsonApi';

const list = [];
let ws1;
let ws2;

/**
 * React component for the `All Requests` of the `App`.
 */
const AllRequests: React.FC = () => {

  // global states
  const party = DamlJsonApi.party;
  const [user, setUser] = useGlobalState('user'); // enable context recycling

  // local states
  const [items, setItems] = useState();

  // filter items
  let itemsDiplays;
  if (items) {
    itemsDiplays = items.map(item => ({ ...item.payload, contractId: item.contractId }));
    itemsDiplays.sort((a, b) => new Date(a.flight.time).getTime() - new Date(b.flight.time).getTime());
  }

  // load requests
  useEffect(() => {
    (async () => {

      if (!party) {
        ws1?.close();
        ws2?.close();
        setItems();
      } else {

        // setup FlightRequest listener
        ws1 = DamlJsonApi.querySocket(["User:FlightRequest"]);
        ws1.addEventListener("message", (event) => {
          const isUpdate = DamlJsonApi.messageHandler(event, list);
          isUpdate && setItems([...list]);
        });

        // setup CompletedRequest listener
        ws2 = DamlJsonApi.querySocket(["User:CompletedRequest"]);
        ws2.addEventListener("message", (event) => {
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
        <Header.Content>All Requests</Header.Content>
      </Header>

      <Divider />

      <List relaxed className="items">
        {itemsDiplays && itemsDiplays.map((item, key) => (
          <Segment key={item.contractId}>
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
            <List.Item>User: <strong>{item.user.split("::")[0]}</strong></List.Item>
          </Segment>
        ))}
      </List>

    </Segment>
  );
}

export default AllRequests;

// <List.Item>Approvers: <strong>{item.approvers.join(', ') || '---'}</strong></List.Item>
// <List.Item>Disapprovers: <strong>{item.disapprovers.join(', ') || '---'}</strong></List.Item>