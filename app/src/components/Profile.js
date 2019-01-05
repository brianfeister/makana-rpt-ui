import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';

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
    <h1>Profile</h1>
  </div>
));
