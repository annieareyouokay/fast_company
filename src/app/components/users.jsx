import React from 'react';
import SearchStatus from './searchStatus';
import User from './user';
import PropTypes from 'prop-types';

const Users = ({ users, usersLength, handleToogleBookmark, handleDelete }) => (
  <div>
    {<SearchStatus length={usersLength} />}
    <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Имя</th>
          <th scope="col">Качества</th>
          <th scope="col">Профессия</th>
          <th scope="col">Втретился,раз</th>
          <th scope="col">Оценка</th>
          <th scope="col">Избранное</th>
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
  </div>
);

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
  usersLength: PropTypes.number.isRequired,
  handleToogleBookmark: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
};

export default Users;
