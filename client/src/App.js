import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Landing from './components/Layouts/Landing';
import AuthContextProvider from './context/Auth.context';
import Auth from './views/Auth';
import Dashboard from './views/Dashboard';
import ProtectedRoute from './components/routing/ProtectedRoute';
import About from './views/About';
import PostContextProvider from './context/Post.context';

function App(props) {
  return (
   <AuthContextProvider>
    <PostContextProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/login" render={props => <Auth {...props} authRoute='login' />} />
          <Route exact path="/resgister" render={props => <Auth {...props} authRoute='resgister' />} />
          <ProtectedRoute exact path="/dashboard" component={Dashboard} />
          <ProtectedRoute exact path="/about" component={About} />
        </Switch>
      </Router>
    </PostContextProvider>
   </AuthContextProvider>
  );
}

export default App;
