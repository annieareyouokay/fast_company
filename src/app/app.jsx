import React, { useState } from 'react';
import api from './api';
import Users from './components/users';
import SearchStatus from './components/searchStatus';
import Pagination from './components/pagination';
import { paginate } from './utils/paginate';

const App = () => {
  const pageSize = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };
  const [users, setUsers] = useState(api.users.fetchAll());
  const userCrop = paginate(users, currentPage, pageSize);

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user._id !== id));
  };

  const handleToogleBookmark = (id) => {
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

  if (!users.length) {
    return <SearchStatus length={users.length} />;
  }

  return (
    <div>
      <Users
        users={userCrop}
        usersLength={users.length}
        handleDelete={handleDelete}
        handleToogleBookmark={handleToogleBookmark}
      />
      <Pagination
        itemsCount={users.length}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default App;
