import React from 'react';
import { List, Header, Icon, Segment, Divider, Label } from 'semantic-ui-react';
import { User } from '@daml.js/dfa';
import { useQuery } from '@daml/react';

const AllRequests: React.FC = () => {

    const results = useQuery(User.FlightRequest);
    const resultsCompleted = useQuery(User.CompletedRequest);

    const itemsRequest = results.contracts
        .map(item => item.payload)
        .reverse();

    const itemsCompleted = resultsCompleted.contracts
        .map(item => item.payload)
        .reverse();

    const items = [...itemsRequest, ...itemsCompleted];
    items.sort((a,b) => new Date(a.flight.time).getTime() - new Date(b.flight.time).getTime())

    return (
        <Segment className="daml-section">

            <Header as='h2'>
                <Icon name='globe' />
                <Header.Content>All Requests</Header.Content>
            </Header>

            <Divider />

            <List relaxed className="items">
                {items && items.map((item, key) => (
                    <Segment key={item.user + item.flight.timeStart + item.flight.timeEnd}>
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
                        <List.Item>Approvers: <strong>{item.approvers.join(', ') || '---'}</strong></List.Item>
                        <List.Item>Disapprovers: <strong>{item.disapprovers.join(', ') || '---'}</strong></List.Item>
                        <List.Item>User: <strong>{item.user}</strong></List.Item>
                    </Segment>
                ))}
            </List>

        </Segment>
    );
}

export default AllRequests;