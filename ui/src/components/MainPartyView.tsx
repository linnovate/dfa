import React from 'react';
import { Container, Grid, Header, Icon, Segment, Divider } from 'semantic-ui-react';
import { User } from '@daml.js/dfa';
import { useParty, useQuery, useReload } from '@daml/react';
import RequestList from './RequestList';
import RequestSendAndEdit from './RequestSendAndEdit';

const MainAdminView: React.FC = () => {
    const party = useParty();
    const allRequestResult = useQuery(User.CompletedRequest, () => ({}), []);
    const allRequiresReview = useQuery(User.FlightRequest, () => ({}), []);
    const myRequestResults = allRequestResult.contracts.filter((req) => req.observers.indexOf(party) > -1 || req.signatories.indexOf(party) > -1);
    const myRequireReview = allRequiresReview.contracts.filter((req) => (req.observers.indexOf(party) > -1 || req.signatories.indexOf(party) > -1)
    && (!(req.payload.approvers.indexOf(party) > -1) && !(req.payload.disapprovers.indexOf(party) > -1)));
    var myRequestResultsMap = myRequestResults.map((req) => req.payload);
    var myRequestResultsIdMap = myRequestResults.map((req) => req.contractId);
    const myRequireReviewMap = myRequireReview.map((req) => req.payload);
    const myRequireReviewIdMap = myRequireReview.map((req) => req.contractId);
    const reload = useReload();

    const userSegmentHandler = () => {
        const parties = ['Admin', 'Zoolog', 'Meteorologist', 'Hamal'];
        //if(parties.indexOf(party) === -1) {
            return <Segment><RequestSendAndEdit update={reload}/></Segment>
       // }
    }
    
    return (
        <Container key={myRequireReviewMap.length}>
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
                                requests = {myRequireReviewMap}
                                requestsId = {myRequireReviewIdMap}
                                update = {reload}
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
                                requests = {myRequestResultsMap}
                                requestsId = {myRequestResultsIdMap}
                                update = {reload}
                            />
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    );
}

export default MainAdminView;