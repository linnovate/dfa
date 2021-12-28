import React from 'react';
import { List, Header, Icon, Segment, Divider } from 'semantic-ui-react';
import { User } from '@daml.js/dfa';
import { useQuery } from '@daml/react';

const Users: React.FC = () => {

    const results = useQuery(User.User);

    const items = results.contracts
        .map(item => item.payload);

    return (
        <Segment  className="daml-section">

            <Header as='h2'>
                <Icon name='globe' />
                <Header.Content>
                    Users
                </Header.Content>
            </Header>

            <Divider />

            <List relaxed className="items">
                {items && items.map((item, key) => (
                    <Segment key={item.username}>
                        <List.Item>Name: <strong>{item.username}</strong></List.Item>
                    </Segment>
                ))}
            </List>

        </Segment>
    );
}

export default Users;