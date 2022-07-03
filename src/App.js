import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/profile/edit" render={ (props) => <ProfileEdit { ...props } /> } />
        <Route exact path="/profile" component={ Profile } />
        <Route path="/favorites" component={ Favorites } />
        <Route path="/album/:id" render={ (props) => <Album { ...props } /> } />
        <Route path="/search" component={ Search } />
        <Route exact path="/" render={ (props) => <Login { ...props } /> } />
        <Route component={ NotFound } />
      </Switch>
    );
  }
}

export default App;
