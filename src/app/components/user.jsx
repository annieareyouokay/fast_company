import React from 'react';
import Bookmark from './bookmark';
import Quality from './quality';
import PropTypes from 'prop-types';

const User = ({
  count,
  name,
  profession,
  qualities,
  bookmark,
  completedMeetings,
  rate,
  handleToogleBookmark,
  handleDelete
}) => {
  return (
    <tr>
      <td>{count + 1}</td>
      <td>{name}</td>
      <td>{profession.name}</td>
      <td>
        {qualities.map((quality) => (
          <Quality key={quality._id} {...quality} />
        ))}
      </td>
      <td>{completedMeetings}</td>
      <td>{rate}</td>
      <td>
        {
          <Bookmark
            bookmark={bookmark}
            handleToogleBookmark={handleToogleBookmark}
          />
        }
      </td>
      <td>
        <button className="btn btn-danger" onClick={handleDelete}>
          Delete
        </button>
      </td>
    </tr>
  );
};

User.propTypes = {
  count: PropTypes.number.isRequired,
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
  bookmark: PropTypes.bool.isRequired,
  completedMeetings: PropTypes.number.isRequired,
  rate: PropTypes.number.isRequired,
  handleToogleBookmark: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
};

export default User;
