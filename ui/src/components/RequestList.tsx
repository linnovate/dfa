import React from 'react';
import { List, Segment } from 'semantic-ui-react';
import { User } from '@daml.js/dfa';
import ViewContract from './ViewContract';

type Props = {
    requests: User.Request[] | undefined;
}

const RequestList: React.FC<Props> = ({requests}) => {
    return (
        <List relaxed>
            {requests && requests.map((request) => (
                <Segment vertical>
                    <List.Item
                        header={"To: " + request.admin}
                        content={"Content: " + request.content}
                    >
                    </List.Item>
                    <ViewContract
                        receivers={request.receivers}
                        approved={request.signed}
                        disapproved={request.disapproved}
                    >
                    </ViewContract>
                </Segment>
            ))}
        </List>
    );
};

export default RequestList;
