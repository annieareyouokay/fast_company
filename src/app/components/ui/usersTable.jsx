import React from 'react';
import PropTypes from 'prop-types';
import Bookmark from '../common/bookmark';
import Qualitites from './qualities';
import Table, { TableBody, TableHeader } from '../common/table';
import { Link } from 'react-router-dom';

const UsersTable = ({
  users,
  handleDelete,
  handleToggleBookmark,
  onSort,
  selectedSort
}) => {
  const columns = {
    counter: { name: '#' },
    name: {
      path: 'name',
      name: 'Имя',
      component: (user) => <Link to={`/users/${user._id}`}>{user.name}</Link>
    },
    qualities: {
      name: 'Качества',
      component: (user) => <Qualitites qualities={user.qualities} />
    },
    professions: { path: 'profession.name', name: 'Профессия' },
    completedMeetings: { path: 'completedMeetings', name: 'Встретился, раз' },
    rate: { path: 'rate', name: 'Оценка' },
    bookmark: {
      path: 'bookmark',
      name: 'Избранное',
      component: (user) => (
        <Bookmark
          bookmark={user.bookmark}
          handleToggleBookmark={() => handleToggleBookmark(user._id)}
        />
      )
    },
    delete: {
      component: (user) => (
        <button
          className="btn btn-danger"
          onClick={() => handleDelete(user._id)}
        >
          Delete
        </button>
      )
    }
  };
  return (
    <Table>
      <TableHeader
        onSort={onSort}
        selectedSort={selectedSort}
        columns={columns}
      />
      <TableBody columns={columns} data={users} />
    </Table>
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
