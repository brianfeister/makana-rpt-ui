import { graphql } from 'react-apollo';
import { compose, withProps, toRenderProps } from 'recompose';
import ClientLoggedInQuery from '../gqlqueries/ClientLoggedIn';

const enhanced = compose(
  graphql(ClientLoggedInQuery,{
    props: ({ data : { auth }}) => ({
      isAuthenticated: auth && sessionStorage.getItem('userToken') && auth.isAuthenticated
    })
  }),
  withProps(({ auth, setAuth } ) => ({
    auth
  }))
);

export default toRenderProps(enhanced);
