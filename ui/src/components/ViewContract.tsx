import React from 'react';
import { List } from 'semantic-ui-react';
import { Party } from '@daml/types';

type Props = {
    receivers: Party[];
    approved: Party[];
    disapproved: Party[];
}

const ViewContract: React.FC<Props> = ({receivers, approved, disapproved}) => {

    const status = (party: Party) => {
        if (approved.indexOf(party) !== -1) {
            return "\u2611";
        }
        if (disapproved.indexOf(party) !== -1) {
            return "\u2612";
        }
        return "\u2610";
    }

    return (
        <List>
            {receivers.map((party) => (
                <List.Item
                    header={party}
                    content={status(party)}
                >
                </List.Item>
            ))}
        </List>
    );
};

export default ViewContract;
