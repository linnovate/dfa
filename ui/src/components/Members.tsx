import React from 'react';
import { List, Header, Icon, Segment, Divider } from 'semantic-ui-react';
import { User } from '@daml.js/dfa';
import { useQuery } from '@daml/react';

const Members: React.FC = () => {

    const results = useQuery(User.GroupMember);

    const groups = {};
    results.contracts.forEach(item => {
        groups[item.payload.group] || (groups[item.payload.group] = []);
        groups[item.payload.group].push(item.payload.member);
    });
    
    
    return (
        <Segment  className="daml-section">

            <Header as='h2'>
                <Icon name='globe' />
                <Header.Content>
                    Members
                </Header.Content>
            </Header>

            <Divider />

            <List relaxed className="items">
                {Object.keys(groups).map((group) => (
                    <Segment key={group}>
                        <List.Item>Group: <strong>{group}</strong></List.Item>
                        <List.Item>Members: <strong>{groups[group].join(", ")}</strong></List.Item>
                    </Segment>
                ))}
            </List>

        </Segment>
    );
}

export default Members;