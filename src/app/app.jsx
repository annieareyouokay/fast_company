import React from 'react';
import Users from './layouts/users';
import NavBar from './components/ui/navBar';
import { Switch, Route } from 'react-router-dom';
import Main from './layouts/main';
import Login from './layouts/login';
import UserEditPage from './components/page/userEditPage/userEditPage';
import { ToastContainer } from 'react-toastify';
import ProfessionProvider from '../hooks/useProfessions';

const App = () => {
  return (
    <>
      <NavBar />
      <ProfessionProvider>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/login" component={Login} />
          <Route path="/users/:id/edit" component={UserEditPage} />
          <Route path="/users/:userId?" component={Users} />
        </Switch>
      </ProfessionProvider>
      <ToastContainer />
    </>
  );
};

export default App;
