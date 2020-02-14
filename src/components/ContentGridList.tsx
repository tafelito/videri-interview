import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import {
  Grid,
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  Box,
} from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import VideocamIcon from '@material-ui/icons/Videocam';

import { REGEX_DATE } from 'utils/regex';
import { getFileName } from 'utils/utils';

const useStyles = makeStyles(() =>
  createStyles({
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
export interface Preview {
  media: 'video' | 'img';
  src: string;
  title: string;
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

  const handleClick = (preview: Preview) => () => {
    onSelectContent && onSelectContent(preview);
  };

  return (
    <GridList cellHeight="auto" className={classes.gridList} cols={4}>
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
          title,
        };

        return (
          <GridListTile key={content.id} data-testid="content-data">
            <Card>
              <CardActionArea
                onClick={handleClick(preview)}
                data-testid="content-action"
              >
                <CardMedia
                  className={classes.media}
                  image={imageSrc}
                  title={title}
                />
              </CardActionArea>
            </Card>
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
                <IconButton
                  className={classes.icon}
                  onClick={handleClick(preview)}
                >
                  {!isVideo ? <ImageIcon /> : <VideocamIcon />}
                </IconButton>
              }
            />
          </GridListTile>
        );
      })}
    </GridList>
  );
}
