import React, { useState, useEffect } from 'react'
import { Form, Button, Header, Icon, Segment, Divider } from 'semantic-ui-react';
import { useGlobalState } from "../contexts/GlobalState";
import DamlJsonApi from '../services/DamlJsonApi';

/**
 * React component for the `Create Member` of the `App`.
 */
const CreateMember: React.FC = () => {

  // global states
  const party = DamlJsonApi.party;
  const [user, setUser] = useGlobalState('user'); // enable context recycling

  // local states
  const [data, setData] = useState({ group: '', member: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [users, setUsers] = useState([]);

  // load users
  useEffect(() => {
    (async () => {

      if (!party) {
        setUsers([]);
      } else {
        // get daml parteis
        const parteis = await DamlJsonApi.getParteis();
        const users = parteis.map(item => ({
          key: item.identifier,
          text: item.identifier,
          value: item.identifier,
        }));
        setUsers(users);
      }

    })()
  }, [party])

  // submit handler
  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    await DamlJsonApi.create('User:GroupMember', { org: party, group: data.group, member: data.member })
      .catch(() => {
        setIsSubmitting(false);
      });
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

      {party &&

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
