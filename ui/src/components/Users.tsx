import React, { useCallback } from 'react';
import { List, Button, Segment } from 'semantic-ui-react';
import { User } from '@daml.js/dfa';
import { useLedger, useParty } from '@daml/react';
import ViewContract from './ViewContract';
import { FlightRequest } from '../../daml.js/dfa-0.1.0/lib/User';
import { ContractId } from '@daml/types';
import { PinMap } from './Maps';

type Props = {
    requests: User.FlightRequest[] | User.CompletedRequest[];
    requestsId: ContractId<FlightRequest>[];
    update: Function;
}

const Users: React.FC<Props> = ({requests, requestsId, update}) => {
    const party = useParty();
    const ledger = useLedger();

    const getIndex = useCallback(async (request: FlightRequest) => {
        for(var i = 0; i < requests.length; i++) {
            if(requests[i] === request) {
                return i;
            }
        }
        return -1; //to handle the case where the value doesn't exist
    }, [requests]);

    const approveRequest = useCallback(async  (request: FlightRequest) => {
        await ledger.exercise(User.FlightRequest.Approved, requestsId[(await getIndex(request)).valueOf()], {approver: party});
        update();
    }, [requestsId, getIndex, ledger, party, update]);

    const disapproveRequest = useCallback(async  (request: FlightRequest) => {
        await ledger.exercise(User.FlightRequest.Disapproved, requestsId[(await getIndex(request)).valueOf()], {disapprover: party});
        update();
    }, [requestsId, getIndex, ledger, party, update]);

    const isParty = (request: FlightRequest) => {
        if(request.parties.indexOf(party) > -1 && (request.approvers.indexOf(party) === -1 && request.disapprovers.indexOf(party) === -1)) {
            return (<><Button
            positive
            onClick={() => approveRequest(request) }
            animated='fade'
        >
            <Button.Content visible>Approve</Button.Content>
            <Button.Content hidden>{"\u2713"}</Button.Content>
        </Button><Button
            negative
            onClick={() => disapproveRequest(request)}
            animated='fade'
        >
                <Button.Content visible>Disapprove</Button.Content>
                <Button.Content hidden>{"\u2715"}</Button.Content>
            </Button></> )
        }
    }

    return (
        <List relaxed>
            {requests && requests.map((request) => (
                <Segment>
                    <List.Item
                        header={"From: " + request.user}
                        content={"Content: lat: " + request.flight.lat + ", lng: " + request.flight.lng + ", Time: " + request.flight.time + ", Altitude: " + request.flight.altitude}
                    >
                    </List.Item>
                    <div style={{width:"100%", height:"300px"}}>
                        <PinMap lat={parseFloat(request.flight.lat)} lng={parseFloat(request.flight.lng)}/>
                    </div>
                    <ViewContract
                        receivers={request.parties}
                        approved={request.approvers}
                        disapproved={request.disapprovers}
                    >
                    </ViewContract>
                    {isParty(request)}
                </Segment>
            ))}
        </List>
    );
};

export default Users;
