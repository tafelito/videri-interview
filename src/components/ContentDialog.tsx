import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { Card, CardMedia } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  title: {
    wordBreak: 'break-all',
  },
});

export interface ContentDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  media: 'video' | 'img';
  src: string;
}

export default function ContentDialog(props: ContentDialogProps) {
  const classes = useStyles();
  const { onClose, open, title, media, src } = props;

  return (
    <Dialog
      onClose={onClose}
      aria-labelledby="content-dialog-title"
      open={open}
    >
      <DialogTitle id="content-dialog-title" className={classes.title}>
        {title}
      </DialogTitle>
      <Card>
        <CardMedia
          component={media}
          src={src}
          title={title}
          controls={media === 'video'}
        />
      </Card>
    </Dialog>
  );
}
