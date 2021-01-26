import React, { ReactType } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Popover, Popper } from '@material-ui/core';


interface AppProps {
  handleClose(): void;
  anchorEl: HTMLButtonElement;
  Content: ReactType | null;
  openModal?(value: string): void;
  classes?: any;
}

export default function SimplePopover(props: AppProps) {
  const classes = useStyles();
  const { handleClose, anchorEl, Content } = props

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        { Content ? <Content {...props} /> : null }
      </Popover> 
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },

  paper: {
    border: '1px solid',
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
  },
}));