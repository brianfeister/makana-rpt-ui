import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import FeedData from '../containers/FeedData';
import FeedSubscriptionData from '../containers/FeedSubscriptionData';
import NewMessage from '../containers/NewMessageWithData';
import AuthState from '../containers/AuthState';
import Navbar from '../components/Navbar';
import ListComments from './ListComments';
import Notice from './Notice';

const styles = theme => ({
  page: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
});

const enhanced = compose(withStyles(styles));

export default enhanced(({ classes }) => (
  <Navbar>
    <div className={classes.page}>
      <AuthState>
        {({ isAuthenticated, user }) => (
          <React.Fragment>
            { isAuthenticated &&
              <React.Fragment>
              <FeedSubscriptionData>
                { props => (
                  <React.Fragment>
                    <Notice {...props} />
                    <FeedData>{props => {
                      return <ListComments {...props} />
                    }}</FeedData>
                  </React.Fragment>
                )}
              </FeedSubscriptionData>
              <NewMessage author={user} />
              </React.Fragment>
            }
            { !isAuthenticated &&
              <FeedSubscriptionData>
                { props => (
                  <React.Fragment>
                    <FeedData subscriptionProps={props}>{props => <ListComments {...props} />}</FeedData>
                  </React.Fragment>
                )}
              </FeedSubscriptionData>
            }
          </React.Fragment>
        )}
      </AuthState>
    </div>
  </Navbar>
));
