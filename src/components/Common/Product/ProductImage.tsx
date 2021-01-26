import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CustomButton from '../CustomButton';
import { Favorite } from '@material-ui/icons';
import { Link, Grid } from '@material-ui/core';
import { Badge, Button } from 'rsuite';
import { url } from 'inspector';
import { observer } from 'mobx-react';

interface AppProps{
    image:  string;
    status: number,
}

const ProductImage = (props: AppProps) => {
    const classes = useStyles();
    const { image, status} = props;
   

    return (
        <div>          
            {/* <div style={{position: "relative", width: "100%", height: "100%"}}> */}
                {/* { status < 0  ? null : <div style={{position: "absolute", top: "10px", left: "15px"}}> */}
                    {/* <CustomButton size="small" text="OUT OF STOCK" classes={classes.btn} /> */}
                    {/* <Button size="xs" className={classes.btn}>OUT OF STOCK</Button> */}
                    {/* <Badge content="OUT OF STOCK" className={classes.btn}/> */}
                {/* </div> } */}

                   
                        {/* <div style={{}}>
                            <img src={image} alt="" style={{width: "100%", maxHeight: 268, minHeight: 268}}/> */}
                            {/* <div style={{position: "relative", top: "10px", right: "15px", cursor: "pointer"}}>
                                <Favorite />
                            </div>  */}
                        {/* </div>    */}
                        <div style={{maxWidth: "100%", minHeight: 268, maxHeight: 268, display: "flex", alignItems: "center"}}>
                            <img  src={image} alt="" style={{width: "100%", maxHeight: 268}} />
                        </div>    

                        
                        {/* <div style={{position: "relative", top: "10px", right: "15px", cursor: "pointer"}}>
                            <Favorite />
                        </div>  */}
            {/* </div> */}
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    
    
    img: {
        display: "flex",
        alignItems: "center",
        maxWidth: "100%", 
        minHeight: 280, 
        backgroundRepeat: "no-repeat", 
        backgroundPositionY: "center", 
        backgroundSize: "contain" 
    }


}));

export default observer(ProductImage)
