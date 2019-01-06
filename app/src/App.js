import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { SnackbarProvider } from 'notistack';
import AuthState from './containers/AuthState';

import Navbar from './components/Navbar';
import Home from './components/Home';
import Messages from './components/Messages';
import Profile from './components/Profile';
import Signup from './containers/SignupWithData';
import Login from './containers/LoginWithData';

import DataProvider from './providers/DataProvider';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './theme';

const App = () => (
  <BrowserRouter>
    <CssBaseline>
      <DataProvider>
        <MuiThemeProvider theme={theme}>
          <AuthState>
            {({ isAuthenticated }) => (
              <React.Fragment>
                { isAuthenticated &&
                    <SnackbarProvider
                      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    >
                      <React.Fragment>
                        <Navbar>
                          <Switch>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/messages" component={Messages} />
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
                        </Navbar>
                      </React.Fragment>
                    </SnackbarProvider>
                }
                { !isAuthenticated &&
                  <React.Fragment>
                    <Navbar>
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
                    </Navbar>
                  </React.Fragment>
                }
              </React.Fragment>
            )}
          </AuthState>
        </MuiThemeProvider>
      </DataProvider>
    </CssBaseline>
  </BrowserRouter>
);

export default App;
