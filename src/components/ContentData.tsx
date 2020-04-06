import React, { useState } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { Typography, Box, CircularProgress } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';
import { Link, useParams } from 'react-router-dom';

import { useQuery } from 'hooks/use-query';
import ContentDialog from 'components/ContentDialog';
import ContentGridList from './ContentGridList';
import { getFileName } from 'utils/utils';
import { Preview } from 'utils/types';
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
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
    media: {
      height: 250,
    },
    subtitle: {
      height: 90,
    },
  }),
);

export default function ContentData() {
  const classes = useStyles();
  const query = useQuery();
  // get the search term from the url
  const { q } = useParams();
  // get type of content to search from query parameters
  const type = query.get('type') || '';
  // get page from query parameters or go to page 1
  const page = Number(query.get('page') || 1);

  const [open, setOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState<Preview | undefined>();

  const isVideo = type === 'videos';
  const perPage = 48;
  const { data, loading, error } = useFetchContent({
    page,
    perPage,
    q,
    type: isVideo ? type : '',
  });

  function handleClickOpen(preview: Preview) {
    setSelectedContent(preview);
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  const hits = data?.hits.sort(function(a: any, b: any) {
    var nameA = getFileName(a).toUpperCase(); // ignore upper and lowercase
    var nameB = getFileName(b).toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    // names must be equal
    return 0;
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
          <ContentGridList
            content={hits}
            isVideo={isVideo}
            onSelectContent={handleClickOpen}
          />
          <Box my={2}>
            <Pagination
              count={Math.ceil(data?.totalHits / perPage)}
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
          {selectedContent && (
            <ContentDialog
              preview={selectedContent}
              open={open}
              onClose={handleClose}
            />
          )}
        </>
      )}
    </div>
  );
}
