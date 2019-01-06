import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import Typography from '@material-ui/core/Typography';

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
    <Typography variant="h4">
      Messages
    </Typography>
    <br />
    <Typography>Private messages will show here.</Typography>
  </div>
));
