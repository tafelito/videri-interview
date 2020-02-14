import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { fakeAuth } from 'utils/auth';
import { useHistory } from 'react-router-dom';
import LoginForm from 'components/LoginForm';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '100vh',
    },
    image: {
      backgroundImage: 'url(https://source.unsplash.com/random)',
      backgroundRepeat: 'no-repeat',
      backgroundColor:
        theme.palette.type === 'dark'
          ? theme.palette.grey[900]
          : theme.palette.grey[50],
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    paper: {
      margin: theme.spacing(8, 4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
  }),
);

export default function Login() {
  const classes = useStyles();
  const history = useHistory();

  async function handleSubmit({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    await fakeAuth.authenticate();
    history.replace('/');
  }

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <LoginForm onSubmit={handleSubmit} />
        </div>
      </Grid>
    </Grid>
  );
}
