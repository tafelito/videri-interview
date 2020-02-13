import React from 'react';
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
import { Link, useParams } from 'react-router-dom';

import { REGEX_DATE } from 'utils/regex';
import { useQuery } from 'hooks/use-query';
import { useFetchContent } from 'hooks/use-fetch-content';

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

export default function ContentGridList() {
  const classes = useStyles();
  const query = useQuery();
  // get the search term from the url
  const { q } = useParams();
  // get type of content to search from query parameters
  const type = query.get('type');
  // get page from query parameters or go to page 1
  const page = Number(query.get('page') || 1);
  // const perPage = 48;

  const isVideo = type === 'videos';
  const { data, loading, error } = useFetchContent({
    q,
    page,
    type: isVideo ? type! : '',
  });

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
              const imageSrc = isVideo
                ? `https://i.vimeocdn.com/video/${content.picture_id}_640x360.jpg`
                : content.webformatURL;

              const dateURL = content.previewURL || content.userImageURL;

              let size;
              if (isVideo) {
                const {
                  videos: {
                    medium: { width, height },
                  },
                } = content;
                size = {
                  width,
                  height,
                };
              } else {
                const { imageWidth: width, imageHeight: height } = content;
                size = {
                  width,
                  height,
                };
              }
              return (
                <GridListTile key={content.id}>
                  <img src={imageSrc} alt={content.tags} />
                  <GridListTileBar
                    classes={{ rootSubtitle: classes.subtitle }}
                    title={imageSrc.substring(imageSrc.lastIndexOf('/') + 1)}
                    subtitle={
                      <Grid container spacing={2} direction="column">
                        <Grid item>{`${size.width} x ${size.height}`}</Grid>
                        <Grid item>
                          <div>
                            <Typography variant="caption">Created</Typography>
                          </div>
                          {dateURL !== '' && dateURL?.match(REGEX_DATE)[0]}
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
