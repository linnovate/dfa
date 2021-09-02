import React from 'react';
import { Container, Grid, Header, Icon, Segment, Divider } from 'semantic-ui-react';
import { User } from '@daml.js/dfa';
import { useParty, useQuery } from '@daml/react';
import RequestList from './RequestList';
import RequestSendAndEdit from './RequestSendAndEdit';

const MainAdminView: React.FC = () => {
    const parties = ["Zoolog", "Meteorologist", "Hamal"];
    const party = useParty();
    const allRequestResult = useQuery(User.CompletedRequest, () => ({parties: parties}), []);
    const allRequiresReview = useQuery(User.FlightRequest, () => ({parties: parties}), []);
    const myRequestResults = allRequestResult.contracts.filter((req) => {return party in req.observers || party in req.signatories ? req : null});
    const myRequireReview = allRequiresReview.contracts.filter((req) => {return party in req.observers || party in req.signatories ? req : null});
    var myRequestResultsMap = myRequestResults.map((req) => req.payload);
    var myRequireReviewMap = myRequireReview.map((req) => req.payload);

    const userSegmentHandler = () => {
        if(party === "User") {
            return <Segment><RequestSendAndEdit/></Segment>
        }
    }
    

    return (
        <Container>
            <Grid centered columns={2}>
                <Grid.Row stretched>
                    <Grid.Column>
                        <Header as='h1' size='huge' color='blue' textAlign='center' style={{padding: '1ex 0em 0ex 0em'}}>
                            {party ? `Welcome, ${party}!` : 'Loading...'}
                        </Header>
                        {userSegmentHandler()}
                        <Segment>
                            <Header as='h2'>
                                <Icon name='globe' />
                                <Header.Content>
                                    Active Requests
                                </Header.Content>
                            </Header>
                            <Divider />
                            <RequestList
                                requests = {myRequestResultsMap}
                            />
                        </Segment>
                        <Segment>
                            <Header as='h2'>
                                <Icon name='globe' />
                                <Header.Content>
                                    Closed Requests
                                </Header.Content>
                            </Header>
                            <Divider />
                            <RequestList
                                requests = {myRequireReviewMap}
                            />
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    );
}

export default MainAdminView;