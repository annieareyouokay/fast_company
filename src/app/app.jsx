import React from 'react';
import Users from './layouts/users';
import NavBar from './components/ui/navBar';
import { Switch, Route } from 'react-router-dom';
import Main from './layouts/main';
import Login from './layouts/login';
import UserEditPage from './components/page/userEditPage/userEditPage';
import { ToastContainer } from 'react-toastify';
import ProfessionProvider from '../hooks/useProfessions';
import QualityProvider from '../hooks/useQualities';
import AuthProvider from '../hooks/useAuth';
import ProtectedRoute from './components/common/protectedRoute';
import LogOut from './layouts/logOut';

const App = () => {
  return (
    <>
      <AuthProvider>
        <NavBar />
        <ProfessionProvider>
          <QualityProvider>
            <Switch>
              <Route exact path='/' component={Main} />
              <Route path='/login' component={Login} />
              <Route path='/logout' component={LogOut} />
              <ProtectedRoute path='/users/:id/edit' component={UserEditPage} />
              <ProtectedRoute path='/users/:userId?' component={Users} />
            </Switch>
          </QualityProvider>
        </ProfessionProvider>
      </AuthProvider>
      <ToastContainer />
    </>
  );
};

export default App;
