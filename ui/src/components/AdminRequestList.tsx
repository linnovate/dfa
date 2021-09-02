import React from 'react';
import { List, Button, Segment } from 'semantic-ui-react';
import { User } from '@daml.js/dfa';
import { useLedger } from '@daml/react';
import ViewContract from './ViewContract';

type Props = {
    requests: User.FlightRequest[] | undefined;
}

const AdminRequestList: React.FC<Props> = ({requests}) => {
    const ledger = useLedger();
    return (
        <List relaxed>
            {requests && requests.map((request) => (
                <Segment>
                    <List.Item
                        header={"To: " + request.admin}
                        content={"Content: " + request.flight}
                    >
                    </List.Item>
                    <ViewContract
                        receivers={request.parties}
                        approved={request.approvers}
                        disapproved={request.disapprovers}
                    >
                    </ViewContract>
                    <Button
                        positive
                        onClick={() => {
                        }}
                        animated='fade'
                    >
                        <Button.Content visible>Approve</Button.Content>
                        <Button.Content hidden>{"\u2713"}</Button.Content>
                    </Button>
                    <Button
                        negative
                        onClick={() => {
                        }}
                        animated='fade'
                    >
                        <Button.Content visible>Disapprove</Button.Content>
                        <Button.Content hidden>{"\u2715"}</Button.Content>
                    </Button>
                </Segment>
            ))}
        </List>
    );
};

export default AdminRequestList;
