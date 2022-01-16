import React, { useState, useEffect } from 'react'
import { List, Button, Header, Icon, Segment, Divider, Label } from 'semantic-ui-react';
import { useGlobalState } from "../contexts/GlobalState";
import DamlJsonApi from '../services/DamlJsonApi';
import { ContractId } from '@daml/types';
import { PinMap } from './Maps';

const list = [];
let ws;

/**
 * React component for the `Requests For Approval` of the `App`.
 */
const RequestsForApproval: React.FC = () => {

  // global states
  const party = DamlJsonApi.party;
  const [user, setUser] = useGlobalState('user'); // enable context recycling

  // local states
  const [items, setItems] = useState();
  const [showMap, setShowMap] = React.useState(false);

  // filter items
  let itemsDiplays;
  if (items) {
    itemsDiplays = items
      .filter(item =>
        (item.payload.parties.includes(party)) && //  || item.signatories.includes(party)
        !(item.payload.approvers.includes(party) || item.payload.disapprovers.includes(party))
      )
      .map(item => ({ ...item.payload, contractId: item.contractId }));
  }

  // load items
  useEffect(() => {
    (async () => {

      if (!party) {
        ws?.close();
        setItems(null);
      } else {
        // setup listener 
        ws = DamlJsonApi.querySocket(["User:FlightRequest"]);
        ws.addEventListener("message", (event) => {
          const isUpdate = DamlJsonApi.messageHandler(event, list);
          isUpdate && setItems([...list]);
        });
      }

    })()
  }, [party])

  // approve handler
  async function approveRequest(contractId: ContractId<User.FlightRequest>) {
    await DamlJsonApi.exercise('User:FlightRequest', contractId, 'Approved', { approver: party });
  };

  // disapprove handler
  async function disapproveRequest(contractId: ContractId<User.FlightRequest>) {
    await DamlJsonApi.exercise('User:FlightRequest', contractId, 'Disapproved', { disapprover: party });
  };

  // template
  return (
    <Segment className="daml-section">

      <Header as='h2'>
        <Icon name='globe' />
        <Header.Content>
          Requests For Approval
        </Header.Content>
      </Header>

      <Divider />

      <List relaxed className="items">
        {itemsDiplays && itemsDiplays.map((item, key) => (
          <Segment key={item.contractId}>
            <Label as='a' color='teal' ribbon={true}>
              Review
            </Label>
            {
              <div className="create-request-map" style={{ width: "100%", height: showMap ? "200px" : "0px" }}>
                {showMap && (<PinMap lat={parseFloat(item.flight.lat)} lng={parseFloat(item.flight.lng)} />)}
              </div>}
            <List.Item>Time: <strong>{item.flight.timeStart} --> {item.flight.timeEnd}</strong></List.Item>
            <List.Item>Location: <strong>lat: {item.flight.lat},  lng: {item.flight.lng},  altitude: {item.flight.altitude}</strong></List.Item>
            <List.Item>User: <strong>{item.user.split("::")[0]}</strong></List.Item>

            {item.parties.includes(party) &&
              <div className="actions">
                <Button
                  positive
                  onClick={() => approveRequest(item.contractId)}
                >Approve</Button>
                <Button
                  secondary
                  onClick={() => disapproveRequest(item.contractId)}
                >Disapprove</Button>
                <Button basic color='blue' icon labelPosition='left'
                  onClick={() => { setShowMap(!showMap) }}
                >
                  <Icon name='map' />map
                </Button>
              </div>
            }
          </Segment>
        ))}
      </List>

    </Segment>
  );
}

export default RequestsForApproval;