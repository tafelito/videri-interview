import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import { Grid, Typography, Box } from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import VideocamIcon from '@material-ui/icons/Videocam';

import { REGEX_DATE } from 'utils/regex';
import { getFileName } from 'utils/utils';
import { Preview } from 'utils/types';
import ContentMedia from './ContentMedia';

export const useStyles = makeStyles(() =>
  createStyles({
    gridList: {
      width: '100%',
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
      padding: 12,
    },
    subtitle: {
      height: 90,
    },
  }),
);

interface Content {
  id: string;
  picture_id?: string;
  webformatURL?: string;
  previewURL?: string;
  userImageURL?: string;
  imageWidth?: number;
  imageHeight?: number;
  videos?: {
    large: {
      url: string;
      width: number;
      height: number;
    };
  };
}

interface Props {
  content?: any[];
  isVideo?: boolean;
  onSelectContent?: (preview: Preview) => void;
}

export default function ContentGridList({
  content,
  isVideo,
  onSelectContent,
}: Props) {
  const classes = useStyles();

  return (
    <GridList cellHeight={250} className={classes.gridList} cols={4}>
      <GridListTile key="Subheader" cols={4} style={{ height: 'auto' }}>
        <ListSubheader component="div">Content</ListSubheader>
      </GridListTile>
      {!content?.length && (
        <Box component="span" m={4} flex={1} textAlign="center">
          No content available
        </Box>
      )}
      {content?.map((content: Content) => {
        const imageSrc =
          content.webformatURL ||
          (content.picture_id
            ? `https://i.vimeocdn.com/video/${content.picture_id}_640x360.jpg`
            : '');

        const url = content.previewURL || content.userImageURL;
        const dateURL = url !== '' && url?.match(REGEX_DATE);
        const title = getFileName(content);

        let size;
        if (content.videos) {
          const {
            large: { width, height },
          } = content.videos;
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

        const preview: Preview = {
          media: isVideo ? 'video' : 'img',
          src: content.videos?.large.url || imageSrc || '',
          previewSrc: imageSrc,
          title,
        };

        const Icon = !isVideo ? ImageIcon : VideocamIcon;

        return (
          <GridListTile key={content.id} data-testid="content-data">
            <ContentMedia {...{ preview, onSelectContent }} />
            <GridListTileBar
              classes={{ rootSubtitle: classes.subtitle }}
              title={title}
              subtitle={
                <Grid container spacing={2} direction="column">
                  <Grid item>{`${size.width} x ${size.height}`}</Grid>
                  <Grid item>
                    <div>
                      <Typography variant="caption">Created</Typography>
                    </div>
                    {dateURL && dateURL[0]}
                  </Grid>
                </Grid>
              }
              actionIcon={
                <div className={classes.icon}>
                  <Icon />
                </div>
              }
            />
          </GridListTile>
        );
      })}
    </GridList>
  );
}
