import React from 'react'
import { List, ListItem } from 'semantic-ui-react';
import { User } from '@daml.js/dfa';
import { useStreamQueries } from '@daml/react';
const Requests: React.FC = () => {
  return (
    <List relaxed>
      {useStreamQueries(User.Request).contracts.map(request => {
        const {sender, admin, content} = request.payload;
        return (
          <ListItem
            className='select-request-item'
            key={request.contractId}>
            <strong>{sender} &rarr; {admin}:</strong> {content}
          </ListItem>
        );
      })}
    </List>
  );
};
export default Requests;