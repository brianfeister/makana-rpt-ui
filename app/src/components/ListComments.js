import React, { Fragment } from 'react';
import Comment from '../containers/CommentWithData';
import { compose, lifecycle } from 'recompose';
import renderWhileLoading from '../utils/renderWhileLoading';

const ListComments = props => {
  const { comments } = props;
  return (
    <Fragment>
      {comments &&
        comments.map(comment => {
          return <Comment key={comment.id} {...comment} />
        })}
    </Fragment>
  );
}

export default compose(
  renderWhileLoading,
  lifecycle({
    componentDidMount() {
      this.props.subscribeToNewComments();
    }
  }),
)(ListComments);
