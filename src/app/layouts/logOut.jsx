import React, { useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';

const LogOut = () => {
  const { logOut } = useAuth();
  useEffect(() => {
    logOut();
  }, []);
  return (<div>logout</div>);
};

export default LogOut;
