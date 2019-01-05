import React from 'react';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  loginContainer: {
    margin: '250px auto 0 auto',
    width: '50%',
    maxWidth: 400,
    minWidth: 250,
  },
  input: {
    marginTop: 30,
  },
  [theme.breakpoints.down('sm')]: {
    loginContainer: {
      margin: '50px auto 0 auto',
      width: '90%',
    }
  }
});

const enhance = compose(
  withStyles(styles),
);

export default enhance(({
  classes,
  onSubmit,
  name,
  email,
  onPasswordChange,
  onEmailChange,
  onNameChange,
}) => (
    <Card className={classes.loginContainer}>
      <CardContent>
        <Typography variant="h5" component="h2">
          Sign Up
        </Typography>
        <form
          onSubmit={e => {
            e.preventDefault();
            if(onSubmit) {
              onSubmit({ variables: { name: e.target.name.value, email: e.target.email.value, password: e.target.password.value } })
              .then( e => {
                console.log('TODO: handle validation errors')
              })
              .catch( e => {
                console.log('TODO: handle submission errors')
              });
            }
          }}
        >
        <FormControl
          fullWidth
          className={classes.input}
        >
          <Input
          type="text"
          placeholder="Name"
          name="name"
          defaultValue={name}
          required={true}
          />
        </FormControl>
        <FormControl
          fullWidth
          className={classes.input}
        >
          <Input
            type="text"
            placeholder="Email"
            name="email"
            defaultValue={email}
            required={true}
            onChange={onEmailChange}
          />
        </FormControl>
        <FormControl
          fullWidth
          className={classes.input}
        >
        <Input
          type="password"
          placeholder="Password"
          name="password"
          required={true}
          onChange={onPasswordChange}
        />
        </FormControl>
          <div>
            <br /><br />
            <Button type="submit" variant="contained" color="primary" className={classes.margin}>
            Sign Up
            </Button>
          </div>
        </form>

      </CardContent>
    </Card>
));
