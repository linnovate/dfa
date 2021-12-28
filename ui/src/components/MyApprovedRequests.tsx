import React from 'react';
import { List, Header, Icon, Segment, Divider } from 'semantic-ui-react';
import { User } from '@daml.js/dfa';
import { useParty, useQuery } from '@daml/react';

const MyApprovedRequests: React.FC = () => {

    const party = useParty();
    const results = useQuery(User.CompletedRequest);

    const items = results.contracts
        .filter(item =>
            item.payload.user === party &&
            (item.payload.disapprovers.length + item.payload.approvers.length === item.payload.parties.length)
        )
        .map(item => item.payload)
        .reverse();
        
    return (
        <Segment className="daml-section">

            <Header as='h2'>
                <Icon name='globe' />
                <Header.Content>My Approved Requests</Header.Content>
            </Header>

            <Divider />

            <List relaxed className="items">
                {items && items.map((item, key) => (
                    <Segment key={item.user + item.flight.timeStart + item.flight.timeEnd}>
                        <List.Item><strong>{item.flight.timeStart} --> {item.flight.timeEnd}, lat: {item.flight.lat}, lng: {item.flight.lng}, altitude: {item.flight.altitude}</strong></List.Item>
                    </Segment>
                ))}
            </List>

        </Segment>
    );
}

export default MyApprovedRequests;