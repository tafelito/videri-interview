import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import { Card, CardMedia, CardHeader, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Preview } from './ContentGridList';

export interface ContentDialogProps {
  open: boolean;
  onClose: () => void;
  preview: Preview;
}

export default function ContentDialog(props: ContentDialogProps) {
  const {
    onClose,
    open,
    preview: { title, media, src },
  } = props;

  return (
    <Dialog
      onClose={onClose}
      aria-labelledby="content-dialog-title"
      open={open}
    >
      <Card>
        <CardHeader
          action={
            <IconButton aria-label="close" onClick={onClose}>
              <CloseIcon />
            </IconButton>
          }
          title={title}
        />
        <CardMedia
          component={media}
          src={src}
          alt={title}
          title={title}
          controls={media === 'video'}
        />
      </Card>
    </Dialog>
  );
}
