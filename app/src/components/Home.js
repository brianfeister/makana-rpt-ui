import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import FeedData from '../containers/FeedData';
import FeedSubscriptionData from '../containers/FeedSubscriptionData';
import AuthState from '../containers/AuthState';
import ListComments from './ListComments';
import Notice from './Notice';

const styles = theme => ({
  page: {
    margin: theme.spacing.unit,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
});

const enhanced = compose(withStyles(styles));

export default enhanced(({ classes }) => (
  <div className={classes.page}>
    <AuthState>
      {({ isAuthenticated }) => (
        <React.Fragment>
          { isAuthenticated &&
            <FeedSubscriptionData>
              {props => <Notice {...props} />}
            </FeedSubscriptionData>
          }
        </React.Fragment>
      )}
    </AuthState>
    <FeedData>{props => <ListComments {...props} />}</FeedData>
  </div>
));
