import React from 'react'
import { List, ListItem } from 'semantic-ui-react';
import { User } from '@daml.js/create-daml-app';
import { useStreamQuery } from '@daml/react';
const Requests: React.FC = () => {
  return (
    <List relaxed>
      {useStreamQuery(User.Request).contracts.map(request => {
        const {sender, receiver, content} = request.payload;
        return (
          <ListItem
            className='select-request-item'
            key={request.contractId}>
            <strong>{sender} &rarr; {receiver}:</strong> {content}
          </ListItem>
        );
      })}
    </List>
  );
};
export default Requests;