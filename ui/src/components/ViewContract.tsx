import React from 'react';
import { List } from 'semantic-ui-react';
import { Party } from '@daml/types';

type Props = {
    receivers: Party[];
    approved: Party[];
    disapproved: Party[];
}

const ViewContract: React.FC<Props> = ({receivers, approved, disapproved}) => {

    const status = (admin: Party) => {
        if (admin in approved) {
            return "\u2611";
        }
        if (admin in disapproved) {
            return "\u2612";
        }
        return "\u2610";
    }

    return (
        <List>
            {receivers.map((admin) => (
                <List.Item
                    header={admin}
                    content={status(admin)}
                >
                </List.Item>
            ))}
        </List>
    );
};

export default ViewContract;
