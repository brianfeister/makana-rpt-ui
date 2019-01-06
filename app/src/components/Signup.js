import React from 'react';
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
  signupContainer: {
    margin: '250px auto 0 auto',
    width: '50%',
    maxWidth: 400,
    minWidth: 250,
  },
  input: {
    marginTop: 30,
  },
  [theme.breakpoints.down('sm')]: {
    signupContainer: {
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
  withState('formErrorName', 'setFormErrorName', null),
  withState('formErrorEmail', 'setFormErrorEmail', null),
  withState('formErrorPassword', 'setFormErrorPassword', null),
  withState('formErrorOther', 'setFormErrorOther', null),
  withState('signupLoading', 'setSignupLoading', null),
);

export default enhance(({
  classes,
  onSubmit,
  name,
  email,

  onNameChange,
  onEmailChange,
  onPasswordChange,

  formErrorName,
  formErrorEmail,
  formErrorPassword,
  formErrorOther,
  signupLoading,

  setFormErrorName,
  setFormErrorEmail,
  setFormErrorPassword,
  setFormErrorOther,
  setSignupLoading,
}) => (
    <Card className={classes.signupContainer}>
      { signupLoading &&
        <LinearProgress />
      }
      { !signupLoading &&
        /* quick hack to prevent visual offset when loading indicator shows */
        <div style={{ height: 5 }} />
      }

      <CardContent>
        <Typography variant="h5">
          Sign Up
        </Typography>
        <form
          onSubmit={ e => {
            e.preventDefault();
            setFormErrorName(null);
            setFormErrorEmail(null);
            setFormErrorPassword(null);
            setFormErrorOther(null);
            if (onSubmit) {
              setSignupLoading(true);
              onSubmit({
                variables: {
                  name: e.target.name.value,
                  email: e.target.email.value,
                  password: e.target.password.value
                }
              })
              .then( e => {
                if(e.errors) {
                  for (let error of e.errors) {
                    switch(error[0]) {
                      case 'name':
                        setFormErrorName(error[1]);
                      break;
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
                }
                setSignupLoading(false);
              })
              .catch( e => {
                if(e.errors) {
                  setFormErrorOther(e.errors);
                }
                setSignupLoading(false);
              });
            }
          }}
        >
        <FormControl
          error={formErrorName !== null}
          fullWidth
          className={classes.input}
        >
          <Input
            type="text"
            placeholder="Name"
            name="name"
            defaultValue={name}
            required={true}
            onChange={onNameChange}
          />
          <FormHelperText>
            {formErrorName}
          </FormHelperText>
        </FormControl>
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
            <Button disabled={signupLoading} type="submit" variant="contained" color="primary" className={classes.margin}>
            Sign Up
            </Button>
          </div>
        </form>

      </CardContent>
    </Card>
));
