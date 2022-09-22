import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import UserPage from './userPage';
import UsersList from './usersList';

const Users = () => {
  const [users, setUsers] = useState();
  const { userId } = useParams();

  useEffect(() => {
    api.users.fetchAll().then((data) => {
      setUsers(data);
    });
  }, []);

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user._id !== id));
  };

  const handleToggleBookmark = (id) => {
    setUsers(
      users.map((user) => {
        if (user._id === id) {
          user.bookmark = !user.bookmark;
          return user;
        } else {
          return user;
        }
      })
    );
  };

  return (
    <>
      {userId
        ? <UserPage {...{ userId }} />
        : <UsersList {...{ users, handleDelete, handleToggleBookmark }} />
      }
    </>
  );
};

export default Users;
