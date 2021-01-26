import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CustomButton from '../CustomButton';
import { Favorite } from '@material-ui/icons';
import { Link } from '@material-ui/core';
import { Button } from 'rsuite';
import { Badge } from 'rsuite';

interface AppProps{
    image:  string;
}

const CartImage = (props: AppProps) => {
    const classes = useStyles();
    const { image } = props;

    return (
        <div>          
            <div style={{maxWidth: "100%", minHeight: 125, display: "flex", alignItems: "center"}}>
                <img src={image} alt="" style={{width: "100%", height: "100%"}} />
            </div>     
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    btn: {
        border: "1px solid #15141b",
        backgroundColor: "transparent",
        boxShadow: "none",
        borderRadius: 6,
        fontSize: 10,
        color: "#15141b",
        '&:hover': {
            color: "#fff",
            border: "1px solid #15141b",
            backgroundColor: "#15141b",
        },

    }
}));

export default CartImage
