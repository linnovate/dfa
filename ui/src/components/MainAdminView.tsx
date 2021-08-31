import React from 'react';
import { Container, Grid, Header, Icon, Segment, Divider } from 'semantic-ui-react';
import { User } from '@daml.js/dfa';
import { useParty, useStreamFetchByKeys, useQuery } from '@daml/react';
import AdminRequestList from './AdminRequestList';

const MainAdminView: React.FC = () => {

    const parties = ["Zoologist", "Meteorologist", "Hamal"];
    const adminame = useParty();
    const myUserResult = useStreamFetchByKeys(User.Admin, () => [adminame], [adminame]);
    const myUser = myUserResult.contracts[0]?.payload;
    const requestResult = useQuery(User.Request, () => ({admin: myUser?.adminame}), []);
    const requiresReview = useQuery(User.Request, () => ({receivers: parties}), []); // we would want usually to create three different fields and check if the user is in one of them but our case is very simple
    var allRequests = requestResult.contracts;
    const admin = myUser as User.Admin;

    if ((myUser?.adminame as string) in parties) {
        allRequests = allRequests.concat(requiresReview.contracts);
    }

    const requests = allRequests.map((request) => request.payload);

    return (
        <Container>
            <Grid centered columns={2}>
                <Grid.Row stretched>
                    <Grid.Column>
                        <Header as='h1' size='huge' color='blue' textAlign='center' style={{padding: '1ex 0em 0ex 0em'}}>
                            {myUser ? `Welcome, ${myUser.adminame}!` : 'Loading...'}
                        </Header>
                        <Segment>
                            <Header as='h2'>
                                <Icon name='globe' />
                                <Header.Content>
                                    Requests
                                </Header.Content>
                            </Header>
                            <Divider />
                            <AdminRequestList
                                requests = {requests}
                                admin = {admin}
                            />
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    );
}

export default MainAdminView;