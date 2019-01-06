import React from 'react';
import { BrowserRouter, Switch, Route, Redirect, Link } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { SnackbarProvider } from 'notistack';
import AuthState from './containers/AuthState';

import Home from './components/Home';
import Profile from './components/Profile';
import Signup from './containers/SignupWithData';
import Login from './containers/LoginWithData';
import Logout from './containers/Logout';

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
                      <React.Fragment>
                        <h1>Logged In!</h1>
                          <Logout>
                              { props => (
                                <a
                                  href="#"
                                  style={{
                                    'fontSize': '20px',
                                    'color': 'blue',
                                  }}
                                  onClick={ e => {
                                     props.handleLogout();
                                }}>
                                  Log Out
                                </a>
                              )}
                          </Logout>
                        <Switch>
                          <Route exact path="/" component={Home} />
                          <Route exact path="/signup" component={Signup} />
                          <Route
                            exact
                            path="/login"
                            render={ () => (
                              <Redirect
                                to={{
                                  pathname: '/'
                                }}
                              />
                            )}
                          />
                          <Route exact path="/profile" component={Profile} />
                        </Switch>
                      </React.Fragment>
                    </SnackbarProvider>
                }
                { !isAuthenticated &&
                  <React.Fragment>
                  <h1>Logged Out!</h1>
                  <Link to="/login">
                    Login
                  </Link>
                  <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/signup" component={Signup} />
                    <Route exact path="/login" component={Login} />
                    <Route
                      exact
                      path="/profile"
                      render={ () => (
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
