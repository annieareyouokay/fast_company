import React from 'react';
import { useParams } from 'react-router-dom';
import UserProvider from '../../hooks/useUsers';
import UserPage from '../components/page/userPage/userPage';
import UsersListPage from '../components/page/usersListPage/usersListPage';

const Users = () => {
  const { userId } = useParams();

  return (
    <>
      <UserProvider>
        {userId ? <UserPage {...{ userId }} /> : <UsersListPage />}
      </UserProvider>
    </>
  );
};

export default Users;
