import { graphql } from 'react-apollo';
import { compose, withProps, toRenderProps } from 'recompose';
import FeedDataQuery from '../gqlqueries/FeedData';
import FeedSubscription from '../gqlqueries/FeedSubscription';

 const enhanced = compose(
   graphql(FeedDataQuery),
   withProps(({ data: { subscribeToMore, loading, feed } }) => {
      return {
        subscribeToNewComments: () => {
          return subscribeToMore({
            document: FeedSubscription,
            updateQuery: (prev, { subscriptionData }) => {
              if (!subscriptionData.data) return prev;
              const targetFeedItem = subscriptionData.data.feedSubscription.node;
              switch(subscriptionData.data.feedSubscription.mutation) {
                case 'CREATED':
                  return Object.assign({}, prev, { feed: [targetFeedItem, ...prev.feed] });
                case 'UPDATED':
                  return Object.assign({}, prev, { feed: prev.feed.map( item => { return item.id === subscriptionData.data.feedSubscription.previousValues.id.replace('StringIdGCValue(','').replace(')','') ? targetFeedItem : item } ) })
                case 'DELETED':
                  return Object.assign({}, prev, { feed: prev.feed.filter( item => { return item.id !== subscriptionData.data.feedSubscription.previousValues.id.replace('StringIdGCValue(','').replace(')','') }) })
                default:
                  return prev
              }
            }
          })
        },
        loading: loading,
        comments: feed,
      }
   }),
 );

 export default toRenderProps(enhanced);
