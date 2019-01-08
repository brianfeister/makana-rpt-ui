import React from 'react';
import { compose, withState } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const styles = theme => ({
  control: {
    float: 'right',
  },
  editDropdown: {
    position: 'absolute',
    top: 0,
    right: 0,
  }
});

const enhanced = compose(
  withStyles(styles),
  withState('anchorEl', 'setAnchorEl', null),
);

export default enhanced(({
  classes,
  anchorEl,

  message,

  editing,
  commentMsg,

  onDeleteClick,
  setEditing,
  setCommentMsg,
  setAnchorEl,
}) => {
  return (
    <React.Fragment>
      <ClickAwayListener onClickAway={() => {
        setAnchorEl(null);
      }}>
        <React.Fragment>
          <IconButton
            size="small"
            className={classes.editDropdown}
            aria-owns={anchorEl ? 'simple-menu' : undefined}
            aria-haspopup="true"
            onClick={e => setAnchorEl(e.currentTarget)}
          >
            <MoreVertIcon fontSize="small" />
          </IconButton>

          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => {
              setAnchorEl(null);
            }}
          >
            <MenuItem onClick={() => {
              setAnchorEl(null);
              setEditing(true);
            }}>
              <EditIcon fontSize="small" aria-label="Edit" />
              &nbsp;&nbsp;Edit
            </MenuItem>
            <MenuItem onClick={() => {
              setAnchorEl(null);
              onDeleteClick();
            }}>
              <DeleteIcon fontSize="small" aria-label="Delete" />
              &nbsp;&nbsp;Delete
            </MenuItem>
          </Menu>
        </React.Fragment>
      </ClickAwayListener>
    </React.Fragment>
  )
});
