import React from 'react';
import { List, Button, Container, Grid, Header, Icon, Segment, Divider } from 'semantic-ui-react';
import { User } from '@daml.js/dfa';
import { useParty, useQuery, useReload } from '@daml/react';
import { FlightRequest } from '../../daml.js/dfa-0.1.0/lib/User';
import { ContractId } from '@daml/types';
import { PinMap } from './Maps';
import ViewContract from './ViewContract';

import results from '../data.json';

const MyRequests: React.FC = () => {
    const party = useParty();
    const allRequestResult = useQuery(User.CompletedRequest, () => ({}), []);
    const allRequiresReview = useQuery(User.FlightRequest, () => ({}), []);
    const myRequestResults = allRequestResult.contracts.filter((req) => req.observers.indexOf(party) > -1 || req.signatories.indexOf(party) > -1);
    const myRequireReview = allRequiresReview.contracts.filter((req) => (req.observers.indexOf(party) > -1 || req.signatories.indexOf(party) > -1)
    && (!(req.payload.approvers.indexOf(party) > -1) && !(req.payload.disapprovers.indexOf(party) > -1)));
    var myRequestResultsMap = myRequestResults.map((req) => req.payload);
    var myRequestResultsIdMap = myRequestResults.map((req) => req.contractId);
    const myRequireReviewMap = myRequireReview.map((req) => req.payload);
    const myRequireReviewIdMap = myRequireReview.map((req) => req.contractId);
    const reload = useReload();
    
    return (
        <Segment>

            <Header as='h2'>
                <Icon name='globe' />
                <Header.Content>
                    Active Requests
                </Header.Content>
            </Header>

            <Divider />

            <List relaxed>
                {results && results.map((request) => (
                    <Segment>
                        <List.Item
                            header={"From: " + request.admin}
                            content={request.sender}
                        >
                        </List.Item>
                         <List.Item
                            header={"Receivers: "}
                            content={request.receivers.join(', ')}
                        >
                        </List.Item>
                    </Segment>
                ))}
            </List>

        </Segment>
    );
}

export default MyRequests;