import React from 'react'
import { Form, Button, Header, Icon, Segment, Divider } from 'semantic-ui-react';
import { useParty, useLedger, useReload} from '@daml/react';
import { User } from '@daml.js/dfa';
import { ChooseMap } from './Maps';

type Props = {
  update: Function;
}

type Flight = {
  lat: string;
  lng: string;
  timeStart: string;
  timeEnd: string;
  altitude: string;
}

const CreateRequest: React.FC<Props> = ({update}) => {
  
  const parties = ["Zoolog", "Meteorologist", "Hamal"];
  const party = useParty();
  const ledger = useLedger();
  const reload = useReload();
  const allowRequest = party && !parties.includes(party);

  const [flight, setFlight] = React.useState<Flight>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [showMap, setShowMap] = React.useState(true);
  
  const submit = async (event: React.FormEvent) => {
    try {
      event.preventDefault();
      setIsSubmitting(true);
      await ledger.exerciseByKey(User.User.CreateRequest, party, { parties, flight });
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
          <Header.Content>Create Request</Header.Content>
      </Header>

      <Divider />

      {allowRequest && 
        <Form className="create-request-form">
            <Button
              basic
              color='blue'
              icon
              labelPosition='left'
              onClick={() => {setShowMap(!showMap)}}
            >
              <Icon name='map' />
              map
            </Button>

          {
          <div className="create-request-map" style={{width:"100%", height: showMap ? "400px" : "0px"}}>
          {showMap && (<ChooseMap onSubmit={(lat:number,lng:number) => setFlight({ ...flight, lat: lat.toString(), lng: lng.toString() })}/>)}
          </div>}
          <Form.Input
            className='select-request-content'
            label="lat coordinates"
            value={flight.lat}
            onChange={e=> setFlight({ ...flight, lat: e.currentTarget.value})}
          />
          <Form.Input
            className='select-request-content'
            label="lng coordinates"
            value={flight.lng}
            onChange={e=> setFlight({ ...flight, lng: e.currentTarget.value})}
          />
          <Form.Input
            className='select-request-content'
            label="Altitude"
            type="number"
            step='100'
            min='0'
            value={flight.altitude}
            onChange={e=> setFlight({ ...flight, altitude: e.currentTarget.value})}
          />
          <Divider className="Divider" />
          <Form.Input
            className='select-request-content'
            label="Start time"
            type="datetime-local"
            value={flight.timeStart}
            onChange={e=> setFlight({ ...flight, timeStart: e.currentTarget.value})}
          />
          <Form.Input
            className='select-request-content'
            label="End time"
            type="datetime-local"
            value={flight.timeEnd}
            onChange={e=> setFlight({ ...flight, timeEnd: e.currentTarget.value})}
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
