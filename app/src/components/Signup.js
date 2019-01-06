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
  withState('formErrorName', 'setFormErrorName', null),
  withState('formErrorEmail', 'setFormErrorEmail', null),
  withState('formErrorPassword', 'setFormErrorPassword', null),
  withState('formErrorOther', 'setFormErrorOther', null)
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

  setFormErrorName,
  setFormErrorEmail,
  setFormErrorPassword,
  setFormErrorOther,
}) => (
    <Card className={classes.loginContainer}>
      <CardContent>
        <Typography variant="h5">
          Sign Up
        </Typography>
        <form
          onSubmit={e => {
            e.preventDefault();
            setFormErrorName(null);
            setFormErrorEmail(null);
            setFormErrorPassword(null);
            setFormErrorOther(null);
            if (onSubmit) {
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
            <Button type="submit" variant="contained" color="primary" className={classes.margin}>
            Sign Up
            </Button>
          </div>
        </form>

      </CardContent>
    </Card>
));
