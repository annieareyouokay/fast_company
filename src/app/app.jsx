import React from 'react';
import Users from './layouts/users';
import NavBar from './components/ui/navBar';
import { Switch, Route } from 'react-router-dom';
import Main from './layouts/main';
import Login from './layouts/login';

const App = () => {
  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/login" component={Login} />
        <Route path="/users/:userId?" component={Users} />
      </Switch>
    </>
  );
};

export default App;
