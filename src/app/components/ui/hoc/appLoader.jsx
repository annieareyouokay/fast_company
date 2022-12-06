import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { getIsLoggedIn, getUsersLoadingStatus, loadUsersList } from '../../../store/users';
import { loadQualitiesList } from '../../../store/qualities';
import { loadProfessionsList } from '../../../store/professions';

const AppLoader = ({ children }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(getIsLoggedIn());
  const usersLoadingStatus = useSelector(getUsersLoadingStatus());

  useEffect(() => {
    dispatch(loadQualitiesList());
    dispatch(loadProfessionsList());
    if (isLoggedIn) {
      dispatch(loadUsersList());
    }
  }, [isLoggedIn]);
  if (usersLoadingStatus) return 'loading';
  return children;
};

AppLoader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default AppLoader;
