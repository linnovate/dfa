import React from 'react'
import { Form, Button } from 'semantic-ui-react';
import { User } from '@daml.js/dfa';
import { useParty, useLedger } from '@daml/react';

type Props = {
  update: Function;
}

type Flight = {
  x: string;
  y: string;
  time: string;
  altitude: string;
}

const RequestSendAndEdit: React.FC<Props> = ({update}) => {
  const party = useParty();
  const ledger = useLedger();
  const [flight, setFlight] = React.useState<Flight>({x: "0", y: "0", time: "00:00", altitude: "0"});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const submit = async (event: React.FormEvent) => {
    try {
      event.preventDefault();
      setIsSubmitting(true);
      const parties = ["Zoolog", "Meteorologist", "Hamal"];
      await ledger.exerciseByKey(User.User.CreateRequest, party, {parties: parties, admin: "Admin", flight:flight});
    } catch (error) {
      alert(`Error sending message:\n${JSON.stringify(error)}`);
    } finally {
      setIsSubmitting(false);
      update();
    }
  };
  return (
    <Form onSubmit={submit}>
      <Form.Input
        className='select-request-content'
        placeholder="X coordinates"
        value={flight.x}
        onChange={e=> setFlight({x: e.currentTarget.value, y: flight.y, time: flight.time, altitude: flight.altitude})}
      />
      <Form.Input
        className='select-request-content'
        placeholder="Y coordinates"
        value={flight.y}
        onChange={e => setFlight({x: flight.x, y: e.currentTarget.value, time: flight.time, altitude: flight.altitude})}
      />
      <Form.Input
        className='select-request-content'
        placeholder="Time"
        value={flight.time}
        onChange={e => setFlight({x: flight.x, y: flight.y, time: e.currentTarget.value, altitude: flight.altitude})}
      />
      <Form.Input
        className='select-request-content'
        placeholder="Altitude"
        value={flight.altitude}
        onChange={e => setFlight({x: flight.x, y: flight.y, time: flight.time, altitude: e.currentTarget.value})}
      />
      <Button
        fluid
        className='select-request-send-button'
        type="submit"
        disabled={isSubmitting || flight.time === "00:00"}
        loading={isSubmitting}
        content="Send"
      />
    </Form>
  );
};

export default RequestSendAndEdit;