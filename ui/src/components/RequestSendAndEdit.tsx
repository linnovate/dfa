import React from 'react'
import { Form, Button } from 'semantic-ui-react';
import { User } from '@daml.js/dfa';
import { useParty, useLedger } from '@daml/react';
type Props = {
    admins: (User.Admin | undefined)[];
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
      const placeholder = [1, 1]; // TODO add map component to choose your place and convert to [Int, Int] = DD * 10 ** 4
      await ledger.exerciseByKey(User.User.SendRequest, sender, {receiver, content, geo: {_1: placeholder[0].toString(), _2: placeholder[1].toString()}});
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
        fluid
        search
        selection
        className='select-request-receiver'
        // If only one admin will be used the next line (and all the parts in the backend meant towards multiple admins should be removed)
        placeholder="Select who you want to process your request"
        //TODO create something like: options={admins.map(admin => ({ key: admin?.adminame, text: admin?.adminame, value: admin?.adminame }))}
        options={[{key: "Admin", text: "Admin", value: "Admin"}]}
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