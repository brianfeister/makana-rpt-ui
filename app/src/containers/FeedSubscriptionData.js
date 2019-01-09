import { graphql } from 'react-apollo';
import { compose, withProps, toRenderProps } from 'recompose';
import FeedSubscriptionQuery from '../gqlqueries/FeedSubscription';

const enhanced = compose(
  graphql(FeedSubscriptionQuery),
  withProps(({ data: { feedSubscription } }) => {
    if (!feedSubscription) {
      return;
    }

    const { mutation, previousValues, node } = feedSubscription;
    const values = mutation === 'DELETED' ? previousValues : node;

    return { ...values, mutation };
  })
);

export default toRenderProps(enhanced);
