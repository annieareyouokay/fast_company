import { React } from 'react';
import PropTypes from 'prop-types';
import UserCard from '../../ui/userInfoCards/userCard';
import MeetingsCard from '../../ui/userInfoCards/meetingsCard';
import QualitiesCard from '../../ui/userInfoCards/qualitiesCard';
import Comments from '../../ui/comments';
import { useUsers } from '../../../../hooks/useUsers';

const UserPage = ({ userId }) => {
  const { getUserById } = useUsers();
  const user = getUserById(userId);

  if (user) {
    return (
      <div className="container">
        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
            <UserCard user={user} />
            <QualitiesCard qualities={user.qualities} />
            <MeetingsCard completedMeetings={user.completedMeetings} />
          </div>
          <div className="col-md-8">
            <Comments userId={userId} />
          </div>
        </div>
      </div>
    );
  } else {
    return <h1>Loading...</h1>;
  }
};

UserPage.propTypes = {
  userId: PropTypes.string.isRequired
};

export default UserPage;
