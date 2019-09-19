import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { ProtectedRoute } from './components/auth/protectedRoute'
import { Page404 } from './components/auth/404'

import LayoutPanel from './common/layout'
import LogInForm from './components/loginForm';
import RegisterForm from './components/registerForm';
import store from './store';
import Alert from 'react-s-alert';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
         <Redirect exact from="/" to="/login" />

          <Switch>
            <Route exact path="/login" component={LogInForm} />
            <Route exact path="/register" component={RegisterForm} />
            <ProtectedRoute exact path="/dashboard" component={LayoutPanel} />
            <Route path="*" component={Page404} />
            

          </Switch>

          <Alert stack={{ limit: 3 }}
            timeout={3000}
            position='top-right' effect='slide' offset={65} />



        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
