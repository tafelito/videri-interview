import React, { useEffect, useState } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import { Grid, Typography, Box, CircularProgress } from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import VideocamIcon from '@material-ui/icons/Videocam';
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';
import { Link, useLocation, useParams } from 'react-router-dom';
import { REGEX_DATE } from 'utils/regex';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      width: '100%',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: '100%',
      //   width: 500,
      //   height: 450,
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
    subtitle: {
      height: 90,
    },
  }),
);

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function ContentGridList() {
  const classes = useStyles();
  const query = useQuery();
  // get the search term from the url
  const { q } = useParams();
  // get type of content to search from query parameters
  const type = query.get('type');
  // get page from query parameters or go to page 1
  const page = Number(query.get('page') || 1);
  const perPage = 48;

  const [{ data, loading, error }, setState] = useState<{
    data?: any;
    error?: string;
    loading: boolean;
  }>({
    data: undefined,
    error: undefined,
    loading: true,
  });

  useEffect(() => {
    setState(state => ({ ...state, error: undefined, loading: true }));
    // pixabay API url (if type = video it will search for video content)
    const api_url = `https://pixabay.com/api/${type || ''}`;
    // using they key from .env doesn't hide the key from the source
    // if the key should not be public, then this has to be moved somewhere else (server)
    fetch(
      `${api_url}?key=${process.env.REACT_APP_PIXABAY_API}&q=${q}&image_type=photo&page=${page}&per_page=${perPage}&safesearch=true`,
    )
      .then(async response => {
        if (response.status === 200) {
          const res = await response.json();
          setState(state => ({
            ...state,
            data: res,
            loading: false,
          }));
        } else {
          // The Promise returned from fetch() won't reject on HTTP error status even if the response is an HTTP 404 or 500.
          // Instead, it will resolve normally, and it will only reject on network failure or if anything prevented the request from completing.
          // https://github.com/github/fetch#caveats
          setState({
            data: undefined,
            error: `Error fetching content: ${response.statusText}`,
            loading: false,
          });
        }
      })
      .catch(error => {
        setState({
          data: undefined,
          error: `Error fetching content: ${error.message}`,
          loading: false,
        });
      });
  }, [type, q, page]);

  return (
    <div className={classes.root}>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography variant="h6" gutterBottom color="error">
          {error}
        </Typography>
      ) : (
        <>
          <GridList cellHeight={250} className={classes.gridList} cols={4}>
            <GridListTile key="Subheader" cols={4} style={{ height: 'auto' }}>
              <ListSubheader component="div">Content</ListSubheader>
            </GridListTile>
            {data.hits.map((content: any) => {
              return (
                <GridListTile key={content.id}>
                  <img src={content.webformatURL} alt={content.tags} />
                  <GridListTileBar
                    classes={{ rootSubtitle: classes.subtitle }}
                    title={content.webformatURL.substring(
                      content.webformatURL.lastIndexOf('/') + 1,
                    )}
                    subtitle={
                      <Grid container spacing={2} direction="column">
                        <Grid
                          item
                        >{`${content.imageWidth} x ${content.imageHeight}`}</Grid>
                        <Grid item>
                          <div>
                            <Typography variant="caption">Created</Typography>
                          </div>
                          {content.previewURL.match(REGEX_DATE)[0]}
                        </Grid>
                      </Grid>
                    }
                    actionIcon={
                      <IconButton className={classes.icon}>
                        {!type ? <ImageIcon /> : <VideocamIcon />}
                      </IconButton>
                    }
                  />
                </GridListTile>
              );
            })}
          </GridList>
          <Box my={2}>
            <Pagination
              count={data.totalHits}
              page={page}
              color="primary"
              renderItem={(item: any) => (
                <PaginationItem
                  component={Link}
                  to={(location: any) => {
                    query.set('page', item.page);
                    return {
                      ...location,
                      search: query.toString(),
                    };
                  }}
                  {...item}
                />
              )}
            />
          </Box>
        </>
      )}
    </div>
  );
}
