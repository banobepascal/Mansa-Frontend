import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import CustomButton from './CustomButton';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { ShoppingCart } from '@material-ui/icons';
import CommonStyles from './CustomStyles';


interface AppProps {
    closeModal?(): void
}

const FullScreenModalNavbar = (props: AppProps) => {
    const classes = useStyles();
    const { closeModal } = props;

    return (
        <div>
            <AppBar position="sticky" style={{backgroundColor: "#fff"}}>
              <Toolbar>
                  <Typography variant="h6" className={classes.title}>
                      Mansa
                  </Typography>
                  <CustomButton EndIcon={ShoppingCart} text="Cart" handleClick={closeModal} classes={CommonStyles().btnBlack} />
              </Toolbar>
            </AppBar>
        </div>
    )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      color: "#000"
    },
  }),
);

export default FullScreenModalNavbar;

