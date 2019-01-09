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
    alignItems: 'center',
    paddingBottom: 250,
  },
  composeContainer: {
    height: 210,
    width: 400,
    //position: 'fixed',
    top: 70,
    left: 0,
    backgroundColor: 'black',
    padding: '0 15px 15px',
    marginTop: -70,
    border: '1px solid #4e4e4e',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
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
              <div className={classes.composeContainer}>
                <NewMessage noReplyToggle={true} author={user} />
              </div>
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
              </React.Fragment>
            }
            { !isAuthenticated &&
              <React.Fragment>
                <FeedData>{props => <ListComments {...props} />}</FeedData>
              </React.Fragment>
            }
          </React.Fragment>
        )}
      </AuthState>
    </div>
  </Navbar>
));
