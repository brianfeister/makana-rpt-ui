import React from 'react';
import { Link } from 'react-router-dom';
import { compose, withState } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';

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
  signupText: {
    padding: '0 20px 15px',
  },
  [theme.breakpoints.down('sm')]: {
    loginContainer: {
      margin: '50px auto 0 auto',
      width: '90%',
    },
    input: {
      marginTop: 10,
    },
  }
});

const enhance = compose(
  withStyles(styles),
  withState('formErrorEmail', 'setFormErrorEmail', null),
  withState('formErrorPassword', 'setFormErrorPassword', null),
  withState('formErrorOther', 'setFormErrorOther', null),
  withState('loginLoading', 'setLoginLoading', null),
);

export default enhance(({
  classes,
  onSubmit,
  email,

  onEmailChange,
  onPasswordChange,

  formErrorEmail,
  formErrorPassword,
  formErrorOther,
  loginLoading,

  setFormErrorEmail,
  setFormErrorPassword,
  setFormErrorOther,
  setLoginLoading
}) => (
    <Card className={classes.loginContainer}>
      { loginLoading &&
        <LinearProgress />
      }
      { !loginLoading &&
        /* quick hack to prevent visual offset when loading indicator shows */
        <div style={{ height: 5 }} />
      }

      <CardContent>
        <Typography variant="h5">
          Log In
        </Typography>
        <form
          onSubmit={ e => {
            e.preventDefault();
            setFormErrorEmail(null);
            setFormErrorPassword(null);
            setFormErrorOther(null);
            if (onSubmit) {
              setLoginLoading(true);
              onSubmit({
                variables: {
                  email: e.target.email.value,
                  password: e.target.password.value
                }
              })
              .then( e => {
                if(e.errors) {
                  for (let error of e.errors) {
                    switch(error[0]) {
                      case 'email':
                        setFormErrorEmail(error[1]);
                      break;
                      case 'password':
                        setFormErrorPassword(error[1]);
                      break;
                      default:
                        setFormErrorOther(error[1]);
                    }
                  }
                  setLoginLoading(false);
                }
              })
              .catch( e => {
                if(e.errors) {
                  setFormErrorOther(e.errors);
                }
                setLoginLoading(false);
              });
            }
          }}
        >
        <FormControl
          error={formErrorEmail !== null}
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
          <FormHelperText>
            {formErrorEmail}
          </FormHelperText>
        </FormControl>
        <FormControl
          error={formErrorPassword !== null}
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
          <FormHelperText>
            {formErrorPassword}
          </FormHelperText>
          <FormHelperText>
            {formErrorOther}
          </FormHelperText>
        </FormControl>
          <div>
            <br />
            <Button disabled={loginLoading} type="submit" variant="contained" color="primary">
            Log In
            </Button>
          </div>
        </form>
      </CardContent>
      <Typography className={classes.signupText}>
        Want to join the conversation?
        &nbsp;&nbsp;
        <Button
          size="small"
          variant="outlined"
          className={classes.button}
          component={Link}
          to="/signup"
        >
          Sign Up
        </Button>
      </Typography>
    </Card>
));
