import React, { useState } from 'react'
import { Form, Button, Header, Icon, Segment, Divider } from 'semantic-ui-react';
import { useGlobalState } from "../contexts/GlobalState";
import DamlJsonApi from '../services/DamlJsonApi';
import { ChooseMap } from './Maps';

type Flight = {
  lat: string;
  lng: string;
  timeStart: string;
  timeEnd: string;
  altitude: string;
}

/**
 * React component for the `Create Request` of the `App`.
 */
const CreateRequest: React.FC<Props> = () => {

  // global states
  const party = DamlJsonApi.party;
  const [requests, setRequests] = useGlobalState('myRequests'); // enable context recycling

  // local states
  const [flight, setFlight] = useState<Flight>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showMap, setShowMap] = useState(true);

  // submit handler
  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    
    const parteis = await DamlJsonApi.getParteis();
    const observers = parteis
      .filter(i => ["Zoolog", "Meteorologist", "Hamal"].includes(i.displayName))
      .map(i => i.identifier);
    
    const res = await DamlJsonApi.create('User:FlightRequest', { user: party, parties: observers, flight, approvers: [], disapprovers: [] })
      .catch(() => setIsSubmitting(false));

    const resRequests = await DamlJsonApi.query(["User:FlightRequest"], { user: party });
    setRequests(resRequests.result);
    
    setIsSubmitting(false);
  };

  // template
  return (
    <Segment className="daml-section">

      <Header as='h2'>
        <Icon name='globe' />
        <Header.Content>Create Request</Header.Content>
      </Header>

      <Divider />

      {party &&

        <Form className="create-request-form">

          <Button basic color='blue' icon labelPosition='left' onClick={() => { setShowMap(!showMap) }} >
            <Icon name='map' /> map
          </Button>

          <div className="create-request-map" style={{ width: "100%", height: showMap ? "400px" : "0px" }}>
            {showMap &&
              <ChooseMap onSubmit={(lat: number, lng: number) => setFlight({ ...flight, lat: lat.toString(), lng: lng.toString() })} />
            }
          </div>

          <Form.Input
            className='select-request-content'
            label="lat coordinates"
            value={flight.lat}
            onChange={e => setFlight({ ...flight, lat: e.currentTarget.value })}
          />

          <Form.Input
            className='select-request-content'
            label="lng coordinates"
            value={flight.lng}
            onChange={e => setFlight({ ...flight, lng: e.currentTarget.value })}
          />

          <Form.Input
            className='select-request-content'
            label="Altitude"
            type="number"
            step='100'
            min='0'
            value={flight.altitude}
            onChange={e => setFlight({ ...flight, altitude: e.currentTarget.value })}
          />

          <Divider className="Divider" />

          <Form.Input
            className='select-request-content'
            label="Start time"
            type="datetime-local"
            value={flight.timeStart}
            onChange={e => setFlight({ ...flight, timeStart: e.currentTarget.value })}
          />

          <Form.Input
            className='select-request-content'
            label="End time"
            type="datetime-local"
            value={flight.timeEnd}
            onChange={e => setFlight({ ...flight, timeEnd: e.currentTarget.value })}
          />

          <Button
            primary
            className='select-request-send-button'
            onClick={submit}
            disabled={isSubmitting || !(flight.lat && flight.lng && flight.altitude)}
            loading={isSubmitting}
            content="Send"
          />

        </Form>

      }

    </Segment>
  );
};

export default CreateRequest;
