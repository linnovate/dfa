import React from 'react'
import { Form, Button } from 'semantic-ui-react';
import { Party } from '@daml/types';
import { User } from '@daml.js/create-daml-app';
import { useParty, useLedger } from '@daml/react';
type Props = {
    admins: Party[];
}
const RequestSendAndEdit: React.FC<Props> = ({admins}) => {
  const sender = useParty();
  const [receiver, setReceiver] = React.useState<string | undefined>();
  const [content, setContent] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const ledger = useLedger();
  const submit = async (event: React.FormEvent) => {
    try {
      event.preventDefault();
      if (receiver === undefined) {
        return;
      }
      setIsSubmitting(true);
      await ledger.exerciseByKey(User.User.SendRequest, receiver, {sender, content});
      setContent("");
    } catch (error) {
      alert(`Error sending message:\n${JSON.stringify(error)}`);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Form onSubmit={submit}>
      <Form.Dropdown
        selection
        className='select-request-receiver'
        // If only one admin will be used the next line (and all the parts in the backend meant towards multiple admins should be removed)
        placeholder="Select who you want to process your request"
        options={admins.map(admin => ({ key: admin, text: admin, value: admin }))}
        value={receiver}
        onChange={event => setReceiver(event.currentTarget.textContent ?? undefined)}
      />
      <Form.Input
        className='select-request-content'
        placeholder="Request content"
        value={content}
        onChange={event => setContent(event.currentTarget.value)}
      />
      <Button
        fluid
        className='select-request-send-button'
        type="submit"
        disabled={isSubmitting || receiver === undefined || content === ""}
        loading={isSubmitting}
        content="Send"
      />
    </Form>
  );
};

export default RequestSendAndEdit;