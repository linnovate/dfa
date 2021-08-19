import React from 'react';
import { List } from 'semantic-ui-react';
import { User } from '@daml.js/create-daml-app';

type Props = {
    requests: User.Request[] | undefined;
}

const RequestList: React.FC<Props> = ({requests}) => {
    return (
        <List relaxed>
            {requests && requests.map((request) => (
                <List.Item
                    header={"To:" + request.receiver}
                    content={"Content: " + request.content}
                >
                </List.Item>
            ))}
        </List>
    );
};

export default RequestList;
