import React from 'react'
import { Form, Button } from 'semantic-ui-react';
import { User } from '@daml.js/dfa';
import { useParty, useLedger } from '@daml/react';
import { ChooseMap } from './Maps';

type Props = {
  update: Function;
}

type Flight = {
  lat: string;
  lng: string;
  time: string;
  altitude: string;
}

const RequestSendAndEdit: React.FC<Props> = ({update}) => {
  const party = useParty();
  const ledger = useLedger();
  const [flight, setFlight] = React.useState<Flight>({lat: "0", lng: "0", time: "00:00", altitude: "0"});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [showMap, setShowMap] = React.useState(true);

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

  const mapHandler =() => {
    return (showMap ? <ChooseMap onSubmit={(lat:number,lng:number) => setFlight({lat: lat.toString(), lng: lng.toString(), time: flight.time, altitude: flight.altitude})}/> : null);
  }

  return (
    <Form onSubmit={submit}>
      <Button fluid
        className=''
        type="button"
        onClick={() => {setShowMap(!showMap)}}
        content={showMap ? "Close map" : "Open map"}
        />
      {
      <div style={{width:"100%", height: showMap ? "400px" : "0px"}}>
      {mapHandler()}
      </div>}
      <Form.Input
        className='select-request-content'
        placeholder="lat coordinates"
        value={flight.lat}
        onChange={e=> setFlight({lat: e.currentTarget.value, lng: flight.lng, time: flight.time, altitude: flight.altitude})}
      />
      <Form.Input
        className='select-request-content'
        placeholder="lng coordinates"
        value={flight.lng}
        onChange={e => setFlight({lat: flight.lat, lng: e.currentTarget.value, time: flight.time, altitude: flight.altitude})}
      />
      <Form.Input
        type="datetime-local"
        className='select-request-content'
        placeholder="Time"
        value={flight.time}
        onChange={e => setFlight({lat: flight.lat, lng: flight.lng, time: e.currentTarget.value, altitude: flight.altitude})}
      />
      <Form.Input
        className='select-request-content'
        placeholder="Altitude"
        type="number"
        step='100'
        min='0'
        value={flight.altitude}
        onChange={e => setFlight({lat: flight.lat, lng: flight.lng, time: flight.time, altitude: e.currentTarget.value})}
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