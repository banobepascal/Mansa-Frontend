import React, { MouseEvent, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Toolbar, Typography } from '@material-ui/core'


interface AppProps {
}

const ToolBar = (props: AppProps) => {
  const classes = useStyles();

  return (
      <Toolbar style={{color: "#000"}}>
        <Typography>Mansa</Typography>
      </Toolbar>
  )
}

const useStyles = makeStyles((theme) => ({

}));

export default ToolBar
