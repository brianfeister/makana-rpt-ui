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
              const newItem = subscriptionData.data.feedSubscription.node;
              switch(subscriptionData.data.feedSubscription.mutation) {
                case 'CREATED':
                  if (newItem.parent) {
                    prev.feed.map( parent => {
                      if ( parent.id === newItem.parent.id ) {
                        parent.children = [...parent.children, newItem]
                      }
                      return parent;
                    });
                    return Object.assign({}, prev);
                  } else {
                    return Object.assign({}, prev, { feed: [newItem, ...prev.feed] });
                  }
                case 'UPDATED':
                  return Object.assign({}, prev, { feed: prev.feed.map( item => { return item.id === subscriptionData.data.feedSubscription.previousValues.id.replace('StringIdGCValue(','').replace(')','') ? newItem : item } ) })
                case 'DELETED':
                  const inParentArr = prev.feed.filter( item => { return item.id === subscriptionData.data.feedSubscription.previousValues.id.replace('StringIdGCValue(','').replace(')','') });
                  if (inParentArr.length === 0 ) {
                    prev.feed.map( parent => {
                      parent.children = parent.children.filter(
                        item => {
                          return item.id !== subscriptionData.data.feedSubscription.previousValues.id.replace('StringIdGCValue(','').replace(')','')
                        }
                      )
                      return parent;
                    });
                    return Object.assign({}, prev);
                  } else {
                    return Object.assign({}, prev, { feed: prev.feed.filter( item => { return item.id !== subscriptionData.data.feedSubscription.previousValues.id.replace('StringIdGCValue(','').replace(')','') }) })
                  }
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
