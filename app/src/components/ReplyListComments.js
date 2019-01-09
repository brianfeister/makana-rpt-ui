import React, { Fragment } from 'react';
import Comment from '../containers/CommentWithData';
import { compose } from 'recompose';
import renderWhileLoading from '../utils/renderWhileLoading';

const ReplyListComments = props => {
  const { comments } = props;
  return (
    <Fragment>
      {comments &&
        comments.map(comment => {
          return <Comment isChild={true} key={comment.id} parentCommentId={comment.parent.id} {...comment} />
        })}
    </Fragment>
  );
}

export default compose(
  renderWhileLoading,
)(ReplyListComments);
