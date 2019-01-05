import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { SnackbarProvider } from 'notistack';
import Home from './components/Home';
import Profile from './components/Profile';
import Signup from './containers/SignupWithData';

import DataProvider from './providers/DataProvider';
import ThemeProvider from './providers/ThemeProvider';

const App = ({ auth = { isAuthenticated: true }}) => (
  <BrowserRouter>
    <CssBaseline>
      <DataProvider>
        <ThemeProvider>
          <SnackbarProvider
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/profile" component={Profile} />
              <Route
                exact
                path="/profile"
                render={props =>
                  auth.isAuthenticated() ? (
                    <Profile />
                  ) : (
                    <Redirect
                      to={{
                        pathname: '/'
                      }}
                    />
                  )
                }
              />
            </Switch>
          </SnackbarProvider>
        </ThemeProvider>
      </DataProvider>
    </CssBaseline>
  </BrowserRouter>
);

export default App;
