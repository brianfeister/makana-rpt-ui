import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import AuthState from '../containers/AuthState';
import Navbar from '../components/Navbar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  page: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  card: {
    marginTop: theme.spacing.unit,
    width: 400,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      flexShrink: 0,
    },
  },
  userCard: {
    position: 'relative',
  },
  avatar: {
    float: 'left',
    marginRight: 10,
    height: 60,
    width: 60,
    fontSize: 40,
  },
});

// @DISCLAIMER - I didn't write this helper fn, converting an arbitrary string
// to a hex color is work done many times by folks on the internet ;)
const stringToColor = str => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xFF;
    color += ('00' + value.toString(16)).substr(-2);
  }
  return color;
}

const enhanced = compose(withStyles(styles));

export default enhanced(({ classes }) => (
  <Navbar>
    <div className={classes.page}>
      <AuthState>
        {({ isAuthenticated, userObj }) => {
          const userDisplay = JSON.parse(userObj)
          return (
          <React.Fragment>
            <Card className={classes.card}>
              <CardContent className={classes.userCard}>
                <Avatar
                  className={classes.avatar}
                  style={{ backgroundColor: stringToColor(userDisplay.id) }}
                >
                  {userDisplay.name.substring(0, 1)}
                </Avatar>
                <Typography variant="h4">{userDisplay.name}</Typography>
                <Typography fontSize="medium">{userDisplay.email}</Typography>

              </CardContent>
            </Card>
          </React.Fragment>
        )
        }}
      </AuthState>
    </div>
  </Navbar>
));
