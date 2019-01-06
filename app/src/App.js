import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { SnackbarProvider } from 'notistack';
import AuthState from './containers/AuthState';

import Home from './components/Home';
import Profile from './components/Profile';
import Signup from './containers/SignupWithData';
import Login from './containers/LoginWithData';

import DataProvider from './providers/DataProvider';
import ThemeProvider from './providers/ThemeProvider';

const App = () => (
  <BrowserRouter>
    <CssBaseline>
      <DataProvider>
        <ThemeProvider>
          <AuthState>
            {({ isAuthenticated }) => (
              <React.Fragment>
                { isAuthenticated &&
                    <SnackbarProvider
                      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    >
                      <h1>Logged In!</h1>
                      <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/signup" component={Signup} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/profile" component={Profile} />
                      </Switch>
                    </SnackbarProvider>
                }
                { !isAuthenticated &&
                  <React.Fragment>
                  <h1>Logged Out!</h1>
                  <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/signup" component={Signup} />
                    <Route exact path="/login" component={Login} />
                    <Route
                      exact
                      path="/profile"
                      render={props => (
                        <Redirect
                          to={{
                            pathname: '/'
                          }}
                        />
                      )}
                    />
                  </Switch>
                  </React.Fragment>
                }
              </React.Fragment>
            )}
          </AuthState>
        </ThemeProvider>
      </DataProvider>
    </CssBaseline>
  </BrowserRouter>
);

export default App;
