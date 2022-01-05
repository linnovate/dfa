import React, { useState } from 'react'
import { List, Button, Header, Icon, Segment, Divider, Label } from 'semantic-ui-react';
import { useGlobalState } from "../contexts/GlobalState";
import DamlJsonApi from '../services/DamlJsonApi';
import { ContractId } from '@daml/types';
import { PinMap } from './Maps';

/**
 * React component for the `Requests For Approval` of the `App`.
 */
const RequestsForApproval: React.FC = () => {

  // global states
  const party = DamlJsonApi.party;
  const [user, setUser] = useGlobalState('user');

  // local states
  const [requests, setRequests] = useState();
  const [showMap, setShowMap] = React.useState(false);

  // load requests
  if (!requests && party) {
    DamlJsonApi.query(["User:FlightRequest"]).then(res => {

      const requests = res.result
        .filter(item =>
          (item.payload.parties.includes(party)) && //  || item.signatories.includes(party)
          !(item.payload.approvers.includes(party) || item.payload.disapprovers.includes(party))
        )
        .map(item => ({ ...item.payload, contractId: item.contractId }));

      setRequests(requests);

    });
  }

  // approve handler
  async function approveRequest(contractId: ContractId<User.FlightRequest>) {
    await DamlJsonApi.exercise('User:FlightRequest', contractId, 'Approved', { approver: party });
    // reset data
    setRequests(null);
  };

  // disapprove handler
  async function disapproveRequest(contractId: ContractId<User.FlightRequest>) {
    await DamlJsonApi.exercise('User:FlightRequest', contractId, 'Disapproved', { disapprover: party });
    // reset data
    setRequests(null);
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
        {requests && requests.map((item, key) => (
          <Segment key={item.user + item.flight.timeStart + item.flight.timeEnd}>
            <Label as='a' color='teal' ribbon='left'>
              Review
            </Label>
            {
              <div className="create-request-map" style={{ width: "100%", height: showMap ? "200px" : "0px" }}>
                {showMap && (<PinMap lat={parseFloat(item.flight.lat)} lng={parseFloat(item.flight.lng)} />)}
              </div>}
            <List.Item>Time: <strong>{item.flight.timeStart} --> {item.flight.timeEnd}</strong></List.Item>
            <List.Item>Location: <strong>lat: {item.flight.lat},  lng: {item.flight.lng},  altitude: {item.flight.altitude}</strong></List.Item>
            <List.Item>User: <strong>{item.user}</strong></List.Item>

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