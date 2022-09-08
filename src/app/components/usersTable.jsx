import React from 'react';
import PropTypes from 'prop-types';
import TableHeader from './tableHeader';
import TableBody from './tableBody';

const UsersTable = ({
  users,
  handleDelete,
  handleToggleBookmark,
  onSort,
  selectedSort
}) => {
  const columns = {
    counter: { name: '#' },
    name: { path: 'name', name: 'Имя' },
    qualities: { name: 'Качества' },
    professions: { path: 'profession.name', name: 'Профессия' },
    completedMeetings: { path: 'completedMeetings', name: 'Встретился, раз' },
    rate: { path: 'rate', name: 'Оценка' },
    bookmark: { path: 'bookmark', name: 'Избранное' },
    delete: {}
  };
  return (
    <table className="table">
      <TableHeader
        onSort={onSort}
        selectedSort={selectedSort}
        columns={columns}
      />
      <TableBody columns={columns} data={users} />
      {/* <tbody>
        {users.map((user, index) => (
          <User
            key={user._id}
            count={index}
            {...user}
            handleDelete={() => handleDelete(user._id)}
            handleToogleBookmark={() => handleToggleBookmark(user._id)}
          />
        ))}
      </tbody> */}
    </table>
  );
};

UsersTable.propTypes = {
  users: PropTypes.array.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleToggleBookmark: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired
};

export default UsersTable;
