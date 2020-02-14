import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { REGEX_EMAIL, REGEX_PASSWORD } from 'utils/regex';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }),
);

interface Props {
  onSubmit: ({ email, password }: { email: string; password: string }) => void;
}
export default function LoginForm({ onSubmit }: Props) {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    //validate email
    const isEmailValid = RegExp(REGEX_EMAIL).test(email);
    //validate password
    const isPasswordValid = RegExp(REGEX_PASSWORD).test(password);

    const errors = {
      ...(!isEmailValid && { email: 'Invalid email' }),
      ...(!isPasswordValid && { password: 'Invalid password' }),
    };

    if (!isEmailValid || !isPasswordValid) {
      setErrors(errors);
      return;
    }

    onSubmit({ email, password });
  }

  return (
    <form className={classes.form} noValidate onSubmit={handleSubmit}>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        inputProps={{
          'aria-label': 'Email Address',
        }}
        name="email"
        autoFocus
        value={email}
        onChange={e => setEmail(e.target.value)}
        error={!!errors?.email}
        helperText={errors?.email}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        inputProps={{
          'aria-label': 'Password',
        }}
        value={password}
        onChange={e => setPassword(e.target.value)}
        error={!!errors?.password}
        helperText={errors?.password}
      />
      <Grid container justify="flex-end">
        <Grid item>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
