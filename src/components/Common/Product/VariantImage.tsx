import React, { useState } from 'react';
import { Backdrop, makeStyles } from '@material-ui/core';

interface AppProps{
    image:  string;
}

const VariantImage = (props: AppProps) => {
    const { image } = props;
    const classes = useStyles();
    const [open, setOpen] = useState<boolean>(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen(!open);
    };

    return (
        <div>  
            <Backdrop className={classes.backdrop} open={open} onClick={handleClose}> 
                <img src={image} alt="" className={classes.displayImg} />
            </Backdrop>   

            <div style={{maxWidth: "100%", minHeight: 100, maxHeight: 100, display: "flex", alignItems: "center"}}>
                <img  onClick={handleToggle} src={image} alt="" style={{width: "100%", height: "auto"}} />
            </div>  
        </div>
    )
}


const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#f2f2f2',
    },

    displayImg: {
        width: "100%", 
        maxWidth: 500, 
        height: "auto",
        maxHeight: "80%",

        [theme.breakpoints.up(2000)]: {
            maxWidth: 900, 
            maxHeight: "100%",
        }
    }

}));

export default VariantImage
