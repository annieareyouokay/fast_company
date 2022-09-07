import React, { useState, useEffect } from 'react';
import SearchStatus from './searchStatus';
import Pagination from './pagination';
import GroupList from './groupList';
import UsersTable from './usersTable';
import { paginate } from '../utils/paginate';
import api from '../api';
import PropTypes from 'prop-types';

const Users = ({ users, handleToogleBookmark, handleDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProf, setSelectedProf] = useState();
  const [professions, setProfessions] = useState();

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
    console.log('sorted');
  };

  const pageSize = 4;
  const filteredUsers = selectedProf
    ? users.filter((user) => user.profession._id === selectedProf._id)
    : users;
  const userCrop = paginate(filteredUsers, currentPage, pageSize);

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
        {<SearchStatus length={filteredUsers.length} />}
        <UsersTable
          users={userCrop}
          handleDelete={handleDelete}
          handleToogleBookmark={handleToogleBookmark}
          onSort={handleSort}
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

Users.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      profession: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
      }),
      qualities: PropTypes.arrayOf(
        PropTypes.shape({
          _id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          color: PropTypes.string.isRequired
        })
      ),
      completedMeetings: PropTypes.number.isRequired,
      rate: PropTypes.number.isRequired,
      bookmark: PropTypes.bool.isRequired
    })
  ).isRequired,
  handleToogleBookmark: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
};

export default Users;
