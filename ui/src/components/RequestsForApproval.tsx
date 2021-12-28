import React from 'react';
import { List, Button, Header, Icon, Segment, Divider, Label } from 'semantic-ui-react';
import { User } from '@daml.js/dfa';
import { useParty, useLedger, useQuery, useReload } from '@daml/react';
import { ContractId } from '@daml/types';
import { PinMap } from './Maps';

const RequestsForApproval: React.FC = () => {

    const party = useParty();
    const ledger = useLedger();
    const results = useQuery(User.FlightRequest);
    const reload = useReload();
    const [showMap, setShowMap] = React.useState(false);

    const items = results.contracts
        .filter(item =>
            (item.payload.parties.includes(party)) && //  || item.signatories.includes(party)
            !(item.payload.approvers.includes(party) || item.payload.disapprovers.includes(party))
        )
        .map(item => ({ ...item.payload, contractId: item.contractId }));

    async function approveRequest(contractId: ContractId<User.FlightRequest>) {
        await ledger.exercise(User.FlightRequest.Approved, contractId, { approver: party });
        reload();
    };

    async function disapproveRequest(contractId: ContractId<User.FlightRequest>) {
        await ledger.exercise(User.FlightRequest.Disapproved, contractId, { disapprover: party });
        reload();
    };

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
                {items && items.map((item, key) => (
                    <Segment key={item.user + item.flight.timeStart + item.flight.timeEnd}>
                        <Label as='a' color='teal' ribbon='left'>
                          Review
                        </Label>
                        {
                        <div className="create-request-map" style={{width:"100%", height: showMap ? "200px" : "0px"}}>
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
                                    onClick={() => {setShowMap(!showMap)}}
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