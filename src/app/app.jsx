import React, { useState, useEffect } from 'react';
import api from './api';
import Users from './components/users';
import SearchStatus from './components/searchStatus';
import Pagination from './components/pagination';
import { paginate } from './utils/paginate';
import GroupList from './components/groupList';

const App = () => {
  const pageSize = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };
  const [users, setUsers] = useState(api.users.fetchAll());
  const [professions, setProfessions] = useState();
  const [selectedProf, setSelectedProf] = useState();
  const userCrop = paginate(users, currentPage, pageSize);

  useEffect(() => {
    api.professions.fetchAll().then((data) => {
      setProfessions(data);
    });
  }, []);
  const handleProfessionSelect = (item) => {
    setSelectedProf(item);
    console.log(item);
  };

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
    return (
      <SearchStatus
        length={users.length}
        onItemSelect={handleProfessionSelect}
      />
    );
  }

  return (
    <div>
      {professions && (
        <GroupList items={professions} onItemSelect={handleProfessionSelect} selectedItem={selectedProf}/>
      )}
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
