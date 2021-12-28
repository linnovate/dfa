import React from 'react'
import { Form, Button, Header, Icon, Segment, Divider } from 'semantic-ui-react';
import { useParty, useLedger, useReload, useQuery } from '@daml/react';
import { User } from '@daml.js/dfa';

type Props = {
  update: Function;
}

const CreateMember: React.FC<Props> = ({update}) => {

  const parties = ["Admin"];
  
  const party = useParty();
  const ledger = useLedger();
  const reload = useReload();
  const allowRequest = party && parties.includes(party);

  const results = useQuery(User.User);

  const users = results.contracts
        .map(item => ({
          key: item.payload.username,
          text: item.payload.username,
          value: item.payload.username,
        }));
  
  const [data, setData] = React.useState({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  
  const submit = async (event: React.FormEvent) => {
    try { 
      event.preventDefault();
      setIsSubmitting(true);
      await ledger.create(User.GroupMember, { org: party, group: data.group, member: data.member });
      reload();
    } catch (error) {
      alert(`Error sending message:\n${JSON.stringify(error)}`);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Segment  className="daml-section">

      <Header as='h2'>
          <Icon name='globe' />
          <Header.Content>Create Members</Header.Content>
      </Header>

      <Divider />

      {allowRequest && 
        <Form className="create-request-form">
          <Form.Dropdown
            fluid
            search
            selection
            className='select-request-receiver'
            placeholder="Select group"
            options={[
            { key: "User", text: "User", value: "User" },
            { key: "Zoolog", text: "Zoolog", value: "Zoolog" },
            { key: "Meteorologist", text: "Meteorologist", value: "Meteorologist" },
            { key: "Hamal", text: "Hamal", value: "Hamal" },]}
            onChange={e => setData({ ...data , group: e.currentTarget.textContent })}
          />

          <Form.Dropdown
            fluid
            search
            selection
            className='select-request-receiver'
            placeholder="Select group"
            options={users}
            onChange={e => setData({ ...data , member: e.currentTarget.textContent })}
          />
          
          <Button
            primary
            className='select-request-send-button'
            onClick={submit}
            loading={isSubmitting}
            content="Send"
          />
        </Form>
      }

    </Segment>
  );
};

export default CreateMember;
