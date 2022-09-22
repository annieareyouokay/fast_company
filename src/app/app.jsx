import React from 'react';
import Users from './components/users';
import NavBar from './components/navBar';
import { Switch, Route } from 'react-router-dom';
import Main from './components/main';
import Login from './components/login';

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
