// Copyright (c) 2021 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import { Container, Grid, Header, Icon, Segment, Divider } from 'semantic-ui-react';
import { User } from '@daml.js/create-daml-app';
import { useParty, useStreamFetchByKeys, useFetchByKey } from '@daml/react';
import Requests from './Requests';
import RequestSendAndEdit from './RequestSendAndEdit';

// USERS_BEGIN
const MainView: React.FC = () => {
  const username = useParty();
  const myUserResult = useStreamFetchByKeys(User.User, () => [username], [username]);
  const myUser = myUserResult.contracts[0]?.payload;
  const admins = [{username: useFetchByKey(User.User, () => "Admin", [username]).contract?.key as string}];
  /* Using:
  const admins = [{username: "Admin"}];
  is also possible but them we won't be sure that it exists
  */

// USERS_END

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
              <Requests />
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
}

export default MainView;