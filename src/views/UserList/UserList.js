import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Error from '../../components/Error/Error';
import api from '../../utils/api';
import styled from 'styled-components';
import Avatar from '../../components/User/Avatar';

class UserList extends Component {
  state = {
    users: [],
    error: null,
  };

  async componentDidMount() {
    const users = await api.get('/users');

    if (users && users.ok) {
      this.setState({
        users: users.data.users,
        error: null,
      });
      return;
    }

    this.setState({ error: users.problem });
  }

  render() {
    if (this.state.error) {
      return <Error message={`failed to load users (${this.state.error})`} />
    }

    return (
      <div>
        {this.state.users.map(u =>
          <User key={u.id}>
            <Avatar username={u.username} gravatar={u.gravatar_hash} />
            <UserDetail>
              <Link to={`/${u.username}`}>
                {u.name && <UserDetailName>{u.name}</UserDetailName>}
                <UserDetailUsername>@{u.username}</UserDetailUsername>
              </Link>
            </UserDetail>
            <GrabCount>
              {u.stats.grabs}
              <GrabCountCaption>Grabs</GrabCountCaption>
            </GrabCount>
          </User>)}
      </div>
    );
  }
}

const User = styled.div`
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
`;

const UserDetail = styled.div`
  margin-left: 0.75rem;
`;

const UserDetailName = styled.div`
  font-weight: bold;
  margin-bottom: 0.125rem;
  color: var(--link-color);
`;

const UserDetailUsername = styled.div`
  color: var(--muted-color);
`;

const GrabCount = styled.div`
  margin-left: auto;
  text-align: center;
`;

const GrabCountCaption = styled.div`
  color: var(--muted-color);
  text-transform: uppercase;
  font-size: 0.75rem;
`;

export default UserList;
