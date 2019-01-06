import React from 'react';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { WebSocketLink } from 'apollo-link-ws';
import { HttpLink } from 'apollo-link-http';
import { split, ApolloLink } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { withClientState } from 'apollo-link-state';

const setAuth = (_, { isAuthenticated }, { cache }) => {
  const data = {
    auth: {
      __typename: 'Auth',
      isAuthenticated
    },
  };
  cache.writeData({ data });
  return null;
};

const setSignupLoading = (_, { loading }, { cache }) => {
  const data = {
    signupState: {
      __typename: 'UiState',
      loading
    },
  };
  cache.writeData({ data });
  return null;
};

const WS_URL = 'ws://localhost:4000';
const HTTP_URL = 'http://localhost:4000';

const wsLink = new WebSocketLink({
  uri: WS_URL,
  options: {
    reconnect: true
  }
});

const httpLink = new HttpLink({
  uri: HTTP_URL
});

const authLink = setContext((_, { headers }) => {
  const token = sessionStorage.getItem('userToken');
  if(token !== null ) {
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      }
    }
  } else {
    return {
      headers: {...headers}
    }
  }
});

const cache = new InMemoryCache();

const defaultState = {
  auth: {
    __typename: 'Auth',
    isAuthenticated: !!sessionStorage.getItem('userToken'),
  }
};

const stateLink = withClientState({
  cache,
  resolvers: {
    Mutation: {
      setAuth,
      setSignupLoading,
    },
  },
  defaults: defaultState
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink
);


const client = new ApolloClient({
  cache,
  link: ApolloLink.from([
    stateLink,
    authLink,
    link
  ])
});

export default ({ children }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);
