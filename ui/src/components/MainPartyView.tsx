import React from 'react';
import { Container, Grid, Header, Icon, Segment, Divider } from 'semantic-ui-react';
import { User } from '@daml.js/dfa';
import { useParty, useStreamFetchByKeys, useQuery } from '@daml/react';
import RequestList from './RequestList';

const MainAdminView: React.FC = () => {
    const parties = ["Zoolog", "Meteorologist", "Hamal"];
    const party = useParty();
    var requestResult, requiresReview, allRequests;

    if (party in parties) {
        requestResult = useQuery(User.CompletedRequest, () => ({parties: parties}), []);
        requiresReview = useQuery(User.FlightRequest, () => ({parties: parties}), []);
    }
    else if (party == 'Admin') {
        requestResult = useQuery(User.CompletedRequest, () => ({admin: party}), []);
        requiresReview = useQuery(User.FlightRequest, () => ({admin: party}), []);
    }
    else {
        requestResult = useQuery(User.CompletedRequest, () => ({user: party}), []);
        requiresReview = useQuery(User.FlightRequest, () => ({user: party}), []);
    }

    allRequests = requestResult.contracts.map((request) => request.payload);
    

    if (party in parties) {
        allRequests = allRequests.concat(requiresReview.contracts.map((request) => request.payload));
    }
    return (
        <Container>
            <Grid centered columns={2}>
                <Grid.Row stretched>
                    <Grid.Column>
                        <Header as='h1' size='huge' color='blue' textAlign='center' style={{padding: '1ex 0em 0ex 0em'}}>
                            {party ? `Welcome, ${party}!` : 'Loading...'}
                        </Header>
                        <Segment>
                            <Header as='h2'>
                                <Icon name='globe' />
                                <Header.Content>
                                    Requests
                                </Header.Content>
                            </Header>
                            <Divider />
                            <RequestList
                                requests = {allRequests}
                            />
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    );
}

export default MainAdminView;