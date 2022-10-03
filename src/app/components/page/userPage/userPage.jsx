import { React, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import API from '../../../api';
import QualititesList from '../../ui/qualities/qualitiesList';
import { useHistory } from 'react-router-dom';

const UserPage = ({ userId }) => {
  const [user, setUser] = useState();
  const history = useHistory();

  useEffect(() => {
    API.users.getById(userId).then((user) => {
      setUser(user);
    });
  }, []);

  const handleReturnToAllUsers = () => {
    history.replace('/users');
  };

  if (user) {
    return (
      <>
        <div>
          <h1>{user.name}</h1>
        </div>
        <div>
          <h2>Профессия: {user.profession.name}</h2>
        </div>
        <QualititesList qualities={user.qualities} />
        <div>Meetings completed: {user.completedMeetings}</div>
        <div>Rate: {user.rate}</div>
        <button
          className="btn btn-secondary mt-2"
          onClick={() => handleReturnToAllUsers()}
        >
          Все пользователи
        </button>
      </>
    );
  } else {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }
};

UserPage.propTypes = {
  userId: PropTypes.string.isRequired
};

export default UserPage;
