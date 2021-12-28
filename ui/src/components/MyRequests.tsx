import React from 'react';
import { List, Header, Icon, Segment, Divider, Label } from 'semantic-ui-react';
import { User } from '@daml.js/dfa';
import { useParty, useQuery } from '@daml/react';

const MyRequests: React.FC = () => {

    const party = useParty();
    const results = useQuery(User.FlightRequest);
    
    const items = results.contracts
        .filter(item =>
            item.payload.user === party &&
            (item.payload.disapprovers.length + item.payload.approvers.length < item.payload.parties.length)
        )
        .map(item => item.payload).reverse();

  console.log(results);  
    
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
                {items && items.map((item, key) => (
                    <Segment key={item.user + item.flight.timeStart + item.flight.timeEnd}>
                        <Label color='blue' ribbon className="label">
                          Request
                        </Label>
                        <List>
                            <List.Item>Info: <strong>lat: {item.flight.lat}, lng: {item.flight.lng}, altitude: {item.flight.altitude}</strong></List.Item>
                            <List.Item>Time: <strong>{item.flight.timeStart} --> {item.flight.timeEnd}</strong></List.Item>
                            <List.Item>Approvers: <strong>{item.approvers.join(', ') || '---'}</strong></List.Item>
                            <List.Item>Disapprovers: <strong>{item.disapprovers.join(', ') || '---'}</strong></List.Item>
                        </List>
                    </Segment>
                ))}
            </List>

        </Segment>
    );
}

export default MyRequests;