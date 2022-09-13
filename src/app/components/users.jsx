import React, { useState, useEffect } from 'react';
import SearchStatus from './searchStatus';
import Pagination from './pagination';
import GroupList from './groupList';
import UsersTable from './usersTable';
import { paginate } from '../utils/paginate';
import api from '../api';
import _ from 'lodash';

const Users = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProf, setSelectedProf] = useState();
  const [professions, setProfessions] = useState();
  const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' });
  const [users, setUsers] = useState();

  useEffect(() => {
    api.users.fetchAll().then((data) => {
      setUsers(data);
    });
  }, []);

  useEffect(() => {
    api.professions.fetchAll().then((data) => {
      setProfessions(data);
    });
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf]);

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleClearFilter = () => {
    setSelectedProf(undefined);
  };

  const handleProfessionSelect = (item) => {
    setSelectedProf(item);
  };

  const handleSort = (item) => {
    setSortBy(item);
  };

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

  if (users) {
    const pageSize = 6;
    const filteredUsers = selectedProf
      ? users.filter((user) => user.profession._id === selectedProf._id)
      : users;
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
    const userCrop = paginate(sortedUsers, currentPage, pageSize);

    if (!users.length) {
      return <SearchStatus length={users.length} />;
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
            <button
              className="btn btn-primary mt-2"
              onClick={handleClearFilter}
            >
              Очистить
            </button>
          </div>
        )}
        <div className="d-flex flex-column">
          {<SearchStatus length={sortedUsers.length} />}
          <UsersTable
            users={userCrop}
            handleDelete={handleDelete}
            handleToggleBookmark={handleToggleBookmark}
            onSort={handleSort}
            selectedSort={sortBy}
          />
          <div className="d-flex justify-content-center">
            <Pagination
              itemsCount={sortedUsers.length}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    );
  } else {
    return 'loading...';
  }
};

export default Users;
