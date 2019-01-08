import React from 'react';
import { compose, withState } from 'recompose';
import TimeAgo from 'react-timeago';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

import PublicIcon from '@material-ui/icons/Public';
import LockIcon from '@material-ui/icons/Lock';

import AuthState from '../containers/AuthState';
import EditComment from '../containers/EditCommentWithData';
import Compose from '../components/Compose';

const styles = theme => ({
  card: {
    marginTop: theme.spacing.unit,
    width: 400,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      flexShrink: 0,
    },
  },
  commentCard: {
    position: 'relative',
  },
  avatar: {
    float: 'left',
    marginRight: 10,
  },
  postVisibilityIcon: {
    marginBottom: -4,
    paddingTop: 3,
    marginLeft: 10,
  }
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

const enhanced = compose(
  withStyles(styles),
  withState('editing', 'setEditing', false),
);

export default enhanced(({
    classes,

    id,
    isPublic,
    author,
    message,
    createdAt,

    editing,
    commentMsg,

    refetch,
    setEditing,
    setCommentMsg,
    onDeleteClick,
    onCommentSave,
  }) => {
  return (
  <Card className={classes.card}>
    <CardContent className={classes.commentCard}>
      <AuthState>
        {({ isAuthenticated, user }) => {
          const userCanEdit = isAuthenticated &&
            user.id.replace('User:','')
            ===
            author.id;
          return (
            <React.Fragment>
              { userCanEdit &&
                <EditComment
                  author={author}
                  id={id}
                  isPublic={isPublic}
                  message={message}
                  refetch={refetch}
                  editing={editing}
                  commentMsg={commentMsg}
                  setEditing={setEditing}
                  setCommentMsg={setCommentMsg}

                />
              }
            </React.Fragment>
          )
        }}
      </AuthState>
      <Avatar
        className={classes.avatar}
        style={{ backgroundColor: stringToColor(author.id) }}
      >
        {author.name.substring(0, 1)}
      </Avatar>
      <Typography>{author.name}</Typography>
      <Typography color="textSecondary" gutterBottom>
        <TimeAgo date={createdAt} />
        { isPublic &&
          <PublicIcon className={classes.postVisibilityIcon} fontSize="small" />
        }
        { !isPublic &&
          <LockIcon className={classes.postVisibilityIcon} fontSize="small" />
        }

      </Typography>
      { !editing &&
        <Typography variant="h5" component="h2">
          {message}
        </Typography>
      }
      { editing &&
        <Compose
          id={id}
          showInitally={isPublic}
          key={`${id}${isPublic}`}
          isPublic={isPublic}
          message={message}
          onCommentSave={onCommentSave}
          refetch={refetch}
          setEditing={setEditing}
        />
      }
    </CardContent>
  </Card>
)});
