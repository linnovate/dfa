import React from 'react';
import { List, Button, Segment } from 'semantic-ui-react';
import { User } from '@daml.js/dfa';
import { useParty } from '@daml/react';
import ViewContract from './ViewContract';

type Props = {
    requests: User.FlightRequest[] | User.CompletedRequest[] | undefined;
}

const AdminRequestList: React.FC<Props> = ({requests}) => {
    const party = useParty();

    const userIsParty = (request: User.FlightRequest | User.CompletedRequest) => {
        if(request.parties.indexOf(party) > -1 && !(request.approvers.indexOf(party) > -1) && !(request.disapprovers.indexOf(party) > -1)) {
            return <><Button
                positive
                onClick={() => {
                } }
                animated='fade'
            >
                <Button.Content visible>Approve</Button.Content>
                <Button.Content hidden>{"\u2713"}</Button.Content>
            </Button><Button
                negative
                onClick={() => {
                } }
                animated='fade'
            >
                    <Button.Content visible>Disapprove</Button.Content>
                    <Button.Content hidden>{"\u2715"}</Button.Content>
                </Button></>
        }
    }

    return (
        <List relaxed>
            {requests && requests.map((request) => (
                <Segment>
                    <List.Item
                        header={"From: " + party}
                        content={"Content: " + request.flight}
                    >
                    </List.Item>
                    <ViewContract
                        receivers={request.parties}
                        approved={request.approvers}
                        disapproved={request.disapprovers}
                    >
                    </ViewContract>
                    {userIsParty(request)}            
                </Segment>
            ))}
        </List>
    );
};

export default AdminRequestList;
