import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  CssBaseline,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Grid,
  Box,
  Button,
} from '@material-ui/core';
import FolderIcon from '@material-ui/icons/Folder';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { grey } from '@material-ui/core/colors';
import { Switch, Route, NavLink } from 'react-router-dom';

import ContentGridList from 'components/ContentGridList';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    button: {
      color: grey[500],
    },
    buttonActive: {
      color: theme.palette.primary.main,
    },
    buttonLabel: {
      flexDirection: 'column',
    },
  }),
);

export default function Content() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            VIDERI Content
          </Typography>
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Container maxWidth={false}>
        <Box my={2}>
          <Grid container spacing={4}>
            <Grid item>
              <Button
                className={classes.button}
                activeClassName={classes.buttonActive}
                classes={{
                  label: classes.buttonLabel,
                }}
                component={NavLink}
                to="/clouds"
              >
                <FolderIcon fontSize="large" />
                Clouds
              </Button>
            </Grid>
            <Grid item>
              <Button
                className={classes.button}
                activeClassName={classes.buttonActive}
                classes={{
                  label: classes.buttonLabel,
                }}
                component={NavLink}
                to="/cars"
              >
                <FolderIcon fontSize="large" />
                Cars
              </Button>
            </Grid>
            <Grid item>
              <Button
                className={classes.button}
                activeClassName={classes.buttonActive}
                classes={{
                  label: classes.buttonLabel,
                }}
                component={NavLink}
                to={{
                  pathname: '/urban',
                  search: '?type=videos',
                }}
              >
                <FolderIcon fontSize="large" />
                Urban (Videos)
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Switch>
          <Route path="/:q" children={<ContentGridList />} />
        </Switch>
      </Container>
    </div>
  );
}
