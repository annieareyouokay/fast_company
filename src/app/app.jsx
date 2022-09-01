import React, { useState, useEffect } from 'react';
import api from './api';
import Users from './components/users';
import SearchStatus from './components/searchStatus';

const App = () => {
  const [users, setUsers] = useState();

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

  if (users && !users.length) {
    return <SearchStatus length={users.length} />;
  }

  return (
    users && (
      <Users
        users={users}
        handleDelete={handleDelete}
        handleToogleBookmark={handleToggleBookmark}
      />
    )
  );
};

export default App;
