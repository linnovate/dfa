import React from 'react';
import { Container, Grid, Header, Icon, Segment, Divider } from 'semantic-ui-react';
import { User } from '@daml.js/dfa';
import { useParty, useStreamFetchByKeys, useQuery } from '@daml/react';
import RequestList from './RequestList';

const MainAdminView: React.FC = () => {

    const adminame = useParty();
    const myUserResult = useStreamFetchByKeys(User.Admin, () => [adminame], [adminame]);
    const myUser = myUserResult.contracts[0]?.payload;
    const requestResult = useQuery(User.Request, () => ({receiver: myUser?.adminame}), []);
    const requests = requestResult.contracts.map((request) => request.payload);

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
                            <RequestList requests={requests} />
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    );
}

export default MainAdminView;