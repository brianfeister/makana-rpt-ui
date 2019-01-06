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
  withState('formErrorOther', 'setFormErrorOther', null)
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

  setFormErrorEmail,
  setFormErrorPassword,
  setFormErrorOther,
}) => (
    <Card className={classes.loginContainer}>
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
                }
              })
              .catch( e => {
                if(e.errors) {
                  setFormErrorOther(e.errors);
                }
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
            <Button type="submit" variant="contained" color="primary" className={classes.margin}>
            Log In
            </Button>
          </div>
        </form>

      </CardContent>
    </Card>
));
