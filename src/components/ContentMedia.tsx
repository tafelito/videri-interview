import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardMedia } from '@material-ui/core';
import { Preview } from 'utils/types';

const useStyles = makeStyles(() =>
  createStyles({
    card: {
      backgroundColor: 'rgb(127,127,127)',
    },
    action: {
      display: 'block',
    },
    media: {
      height: 250,
    },
  }),
);

interface Props {
  onSelectContent?: (preview: Preview) => void;
  preview: Preview;
}

export default function ContentMedia({ preview, onSelectContent }: Props) {
  const classes = useStyles();
  const { previewSrc, title } = preview;

  const handleClick = () => {
    onSelectContent && onSelectContent(preview);
  };

  return (
    <Card className={classes.card}>
      <CardActionArea
        onClick={handleClick}
        data-testid="content-action"
        className={classes.action}
      >
        <CardMedia className={classes.media} image={previewSrc} title={title} />
      </CardActionArea>
    </Card>
  );
}
