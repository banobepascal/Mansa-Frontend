import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { HomePageSectionTwoDataProps } from '../../../../data/data';


const CategoryContainer = (props: HomePageSectionTwoDataProps) => {
    const { image, title, name } = props;
    
    return (
        <div>
            <div style={{position: "relative", width: "100%"}}>
                <div style={{maxWidth: "100%", height: "auto"}}>  
                    <img src={image} alt="" style={{width: "100%"}} />
                </div>
                
                <div style={{position: "absolute", top: "50%", right: "30px", bottom: "auto", transform: "translateY(-50%)"}}>
                    <div>
                        { title ? <div>
                            <Typography align="center">DeWalt</Typography>
                        </div> : null }
                        
                        <div>
                            <Typography style={{fontWeight: 600}}>{name}</Typography>
                        </div>
                        <div>
                            <Typography align="center">SHOP NOW</Typography>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
 
}));

export default CategoryContainer
