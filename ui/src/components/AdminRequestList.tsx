import React from 'react';
import { List, Button, Segment } from 'semantic-ui-react';
import { User } from '@daml.js/dfa';
import { useLedger } from '@daml/react';

type Props = {
    requests: User.Request[] | undefined;
    admin: User.Admin;
}

const AdminRequestList: React.FC<Props> = ({requests, admin}) => {
    const ledger = useLedger();
    return (
        <List relaxed>
            {requests && requests.map((request) => (
                <Segment>
                    <List.Item
                        header={"To:" + request.admin}
                        content={"Content: " + request.content}
                    >
                    </List.Item>
                    <Button
                        positive
                        onClick={() => {
                            if (admin.adminame === "Admin") { // check if the main admin is trying to finalize the process
                                ledger.exerciseByKey(User.Request.Finalize, {_1: request.admin, _2: request.content}, {signer: admin.adminame});
                            }
                            else {
                                ledger.exerciseByKey(User.Request.Sign, {_1: request.admin, _2: request.content}, {signer: admin.adminame});
                            }
                        }}
                        animated='fade'
                    >
                        <Button.Content visible>Approve</Button.Content>
                        <Button.Content hidden>{"\u2713"}</Button.Content>
                    </Button>
                </Segment>
            ))}
        </List>
    );
};

export default AdminRequestList;
