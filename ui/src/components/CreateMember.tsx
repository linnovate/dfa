import React, { useState, useEffect } from 'react'
import { Form, Button, Header, Icon, Segment, Divider } from 'semantic-ui-react';
import { useGlobalState } from "../contexts/GlobalState";
import DamlJsonApi from '../services/DamlJsonApi';

/**
 * React component for the `Create Member` of the `App`.
 */
const CreateMember: React.FC<Props> = () => {

  // global states
  const party = DamlJsonApi.party;
  const [, setMembers] = useGlobalState('members');

  // local states
  const [data, setData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [users, setUsers] = useState();

  // is allow
  const parties = ["Admin"];
  const allowRequest = party && parties.includes(party);

  // load users
  useEffect(() => {
    (async () => {
      
      if (!party) {
        setUsers(null);
      } else {
        const res = await DamlJsonApi.query(["User:User"]);
        const users = res.result.map(item => ({
          key: item.payload.username,
          text: item.payload.username,
          value: item.payload.username,
        }));
        setUsers(users);
      }
      
    })()
  }, [party])
  
  // submit handler
  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    await DamlJsonApi.create('User:GroupMember', { org: 'Admin', group: data.group, member: data.member })
      .catch(() => {
        setIsSubmitting(false);
      });
    const res = await DamlJsonApi.query(["User:GroupMember"]);
    setMembers(res.result);
    setIsSubmitting(false);
  };

  // template
  return (
    <Segment className="daml-section">

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
            onChange={e => setData({ ...data, group: e.currentTarget.textContent })}
          />

          <Form.Dropdown
            fluid
            search
            selection
            className='select-request-receiver'
            placeholder="Select group"
            options={users || []}
            onChange={e => setData({ ...data, member: e.currentTarget.textContent })}
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
