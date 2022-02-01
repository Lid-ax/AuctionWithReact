import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import NavBar from "./components/Navbar";
import Home from "./components/Home.js";
import Login from './components/login/Login';
import Register from './components/login/register';
import NewAuctions from './components/NewAuctions';
import Description from './components/Description';
import Profile from './components/Profile';
import WinnedBids from './components/WinnedBids';
import OwnedBids from './components/OwnedBids';

const RestrictedRoute = ({ path, component }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user == null) return <Redirect to='/login' />;
  return <Route exact path={path} component={component} />;
}

const App = () => {
  return (
    <Router>
      <div>
        <NavBar/>
        <Switch>
          <RestrictedRoute exact path='/' component={Home} />
          <Route path="/login" component={Login} />
          <Route exact path='/register' component={Register} />
          <RestrictedRoute exact path='/NewAuctions' component={NewAuctions}/>
          <RestrictedRoute exact path='/Description' component={Description}/>
          <RestrictedRoute exact path='/Profile' component={Profile}/>
          <RestrictedRoute exact path='/Profile/WinnedBids' component={WinnedBids}/>
          <RestrictedRoute exact path='/Profile/OwnedBids' component={OwnedBids}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
