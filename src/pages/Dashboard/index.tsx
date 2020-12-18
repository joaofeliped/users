import React, { useState } from 'react';
import { getUsers } from '../../services/api';
import { Container, Content } from './styles';

const Dashboard: React.FC = () => {
  const [users, setUsers] = useState(getUsers());

  return (
    <Container>
      <Content>
        <h1>Usuários cadastrados</h1>
        <ul>
          {users.map(user => (
            <li key={user.email}>{user.name}</li>
          ))}
        </ul>
      </Content>
    </Container>
  );
};

export default Dashboard;
