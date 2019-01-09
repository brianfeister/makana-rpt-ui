import { graphql } from 'react-apollo';
import { compose, withHandlers } from 'recompose';
import LogoutQuery from '../gqlqueries/Logout';

const handleLogout = ({ mutate }) => {
  mutate({
    variables: {isAuthenticated: false}
  });
  sessionStorage.removeItem('userToken');
  window.__APOLLO_CLIENT__.resetStore();
};

export default compose(
  graphql(LogoutQuery),
  withHandlers({
    handleLogout: props => event => {
      handleLogout(props);
    }
  })
)(({ children, ...props }) => children(props));
