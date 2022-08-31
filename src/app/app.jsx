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

  const filteredUsers = selectedProf
    ? users.filter((user) => user.profession === selectedProf)
    : users;
  const userCrop = paginate(filteredUsers, currentPage, pageSize);

  useEffect(() => {
    api.professions.fetchAll().then((data) => {
      setProfessions(data);
    });
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf]);

  const handleProfessionSelect = (item) => {
    setSelectedProf(item);
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

  const handleClearFilter = () => {
    setSelectedProf(undefined);
  };

  if (!users.length) {
    return <SearchStatus length={filteredUsers.length} />;
  }

  return (
    <div className="d-flex">
      {professions && (
        <div className="d-flex flex-column flex-shrink-0 p-3">
          <GroupList
            items={professions}
            onItemSelect={handleProfessionSelect}
            selectedItem={selectedProf}
          />
          <button className="btn btn-primary mt-2" onClick={handleClearFilter}>
            Очистить
          </button>
        </div>
      )}
      <div className="d-flex flex-column">
        <Users
          users={userCrop}
          usersLength={filteredUsers.length}
          handleDelete={handleDelete}
          handleToogleBookmark={handleToogleBookmark}
        />
        <div className="d-flex justify-content-center">
          <Pagination
            itemsCount={filteredUsers.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
