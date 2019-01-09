import React from 'react';
import { compose, withState } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const styles = theme => ({
  composeForm: {
    marginTop: 0,
  }
});

const enhance = compose(
  withStyles(styles),
  withState('commentSaving', 'setCommentSaving', null),
  withState('isPublicState', 'setIsPublicState', ({ showInitally }) => showInitally),
  withState('isReplying', 'setIsReplying', false),
);

export default enhance(({
  classes,

  id,
  isPublic,
  message,
  author,

  label,
  rows = 1,
  buttonText = 'Post',
  parentCommentId,
  noReplyToggle,
  postNewComment,

  onCommentSave,
  onCommentEdit,

  commentSaving,
  isPublicState,
  isReplying,
  editing,

  setCommentSaving,
  setIsPublicState,
  setIsReplying,

  setEditing,
}) => {

  const handleSwitchChange = e => {
    setIsPublicState(!isPublicState);
  };

  return (
    <React.Fragment>
      <form
        className={classes.composeForm}
        onSubmit={ e => {
          e.preventDefault();
          if (onCommentSave) {
            setCommentSaving(true);
            let variables;
            // add new reply to existing comment
            if (parentCommentId) {
              variables = {
                id: author.id.replace('User:', ''),
                isPublic: isPublicState === undefined ? false : isPublicState,
                message: e.target.message.value,
                children: [],
                parentCommentId: parentCommentId,
              }
            // edit existing comments
            } else if (id !== undefined) {
              variables = {
                id: id,
                isPublic: isPublicState === undefined ? isPublic : isPublicState,
                message: e.target.message.value,
                parent: null,
              }
            // create new comments
            } else {
              variables = {
                id: author.id.replace('User:', ''),
                isPublic: isPublicState === undefined ? false : isPublicState,
                message: e.target.message.value,
                children: [],
              }
            }
            if (postNewComment) {
              onCommentSave({
                variables
              })
              .then(() => {
                setCommentSaving(false);
                setEditing(false);
                setIsReplying(false);
              })
              .catch( e => {
                setCommentSaving(false);
              });
            } else {
              onCommentEdit({
                variables
              })
              .then(() => {
                setCommentSaving(false);
                setEditing(false);
                setIsReplying(false);
              })
              .catch( e => {
                setCommentSaving(false);
              });
            }
          }
        }}
      >
      { !editing && !noReplyToggle && !isReplying &&
        <Button
          size="small"
          onClick={() => setIsReplying(true)}
        >
          + Add a Comment
        </Button>
      }
      { (editing || noReplyToggle || isReplying) &&
        <React.Fragment>
          <FormControl
            fullWidth
            className={classes.input}
          >
            <TextField
              id="filled-textarea"
              multiline
              className={classes.textField}
              margin="normal"
              variant="filled"
              name="message"
              defaultValue={message}
              required={true}
              label={label}
              rows={rows}
              fullWidth
            />
            { commentSaving &&
              <LinearProgress style={{ marginTop: -8 }} />
            }
            { !commentSaving &&
              /* quick hack to prevent visual offset when loading indicator shows */
              <div style={{ height: 5, marginTop: -8 }} />
            }
          </FormControl>
          <FormControl
            className={classes.input}
          >
          <FormControlLabel control={
            <Switch
              label="Public Comment"
              onChange={handleSwitchChange}
              checked={isPublicState}
              name="isPublic"
              disabled={isPublic}
              color="primary"
            />
            } label="Public Comment" />
          </FormControl>

          <div>
            <Button disabled={commentSaving} type="submit" variant="contained" size="small" color="primary">
             {buttonText}
            </Button>
            &nbsp;&nbsp;
            { setEditing &&
              <Button
                onClick={() => {
                  setEditing(false);
                  setIsReplying(false);
                }}
                disabled={commentSaving}
                size="small" >
               Cancel
              </Button>
            }
          </div>
        </React.Fragment>
      }
      </form>
    </React.Fragment>
  );
});
