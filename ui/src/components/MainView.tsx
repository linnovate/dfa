// Copyright (c) 2021 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import { Container, Grid, Header, Icon, Segment, Divider } from 'semantic-ui-react';
import { User } from '@daml.js/dfa';
import { useParty, useStreamFetchByKeys } from '@daml/react';
import Requests from './Requests';
import RequestSendAndEdit from './RequestSendAndEdit';
import RequestList from './RequestList';

const MainView: React.FC = () => {
  const username = useParty();
  const myUserResult = useStreamFetchByKeys(User.User, () => [username], [username]);
  const myUser = myUserResult.contracts[0]?.payload;
  const adminsResult = useStreamFetchByKeys(User.Admin, () => [username], [username]);
  const admins = adminsResult.contracts.map((admin) => admin?.payload);

  return (
    <Container>
      <Grid centered columns={2}>
        <Grid.Row stretched>
          <Grid.Column>
            <Header as='h1' size='huge' color='blue' textAlign='center' style={{padding: '1ex 0em 0ex 0em'}}>
                {myUser ? `Welcome, ${myUser.username}!` : 'Loading...'}
            </Header>
            <Segment>
              <Header as='h2'>
                <Icon name='pencil square' />
                <Header.Content>
                  Requests
                  <Header.Subheader>Send a Request</Header.Subheader>
                </Header.Content>
              </Header>
              <RequestSendAndEdit admins={admins}/>
              <Divider />
            </Segment>
            <Segment>
              <Header as='h2'>
                <Icon name='globe' />
                <Header.Content>
                  My requests
                </Header.Content>
              </Header>
              <Divider />
              <RequestList requests={myUser?.requests} />
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
}

export default MainView;