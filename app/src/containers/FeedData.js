import { graphql } from 'react-apollo';
import { compose, withProps, toRenderProps } from 'recompose';
import FeedDataQuery from '../gqlqueries/FeedData';

const enhanced = compose(
  graphql(FeedDataQuery),
  withProps(({ data: { loading, feed } }) => ({
    loading: loading,
    comments: feed
  }))
);

export default toRenderProps(enhanced);
