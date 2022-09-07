import React from 'react';
import PropTypes from 'prop-types';
import User from './user';

const UsersTable = ({ users, handleDelete, handleToogleBookmark, onSort }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th onClick={() => onSort('name')} scope="col" role='button'>Имя</th>
          <th scope="col">Качества</th>
          <th onClick={() => onSort('professions.name')} scope="col" role='button'>Профессия</th>
          <th onClick={() => onSort('completedMeetings')} scope="col" role='button'>Втретился,раз</th>
          <th onClick={() => onSort('rate')} scope="col" role='button'>Оценка</th>
          <th onClick={() => onSort('bookmark')} scope="col" role='button'>Избранное</th>
          <th scope="col" />
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <User
            key={user._id}
            count={index}
            {...user}
            handleDelete={() => handleDelete(user._id)}
            handleToogleBookmark={() => handleToogleBookmark(user._id)}
          />
        ))}
      </tbody>
    </table>
  );
};

UsersTable.propTypes = {
  users: PropTypes.array.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleToogleBookmark: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired
};

export default UsersTable;
