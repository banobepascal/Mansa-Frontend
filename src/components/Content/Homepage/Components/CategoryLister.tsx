import React from 'react';
import { Grid, List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import { Apps} from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles';
import { categoryData } from '../../../../data/data';

const CategoryLister = () => {
    const classes = useStyles();

    return (
        <Grid>
            <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListItem button className={classes.categoryLabel}>
                        <ListItemIcon>
                            <Apps style={{color: "#fff"}} />
                        </ListItemIcon>
                        <ListItemText>
                            <Typography variant="h6" style={{ fontWeight: 600, color: "#fff" }}>
                                Categories
                            </Typography>
                        </ListItemText>
                    </ListItem>
                }
                className={classes.categoryList}
                >

                { categoryData.map((category) => {
                    return (
                        <ListItem button className={classes.category}> 
                            <ListItemText>
                                <Typography variant="body2">{category}</Typography>
                            </ListItemText>
                        </ListItem>
                    )
                }) }
                
            </List>
        </Grid>
    )
}

const useStyles = makeStyles((theme) => ({
    categoryList: {
        
    },

    category: {
        backgroundColor: "#FFAB00",
        '&:hover': {
            backgroundColor: "#FF8B00",
            color: "#fff"
        }
    },

    categoryLabel: {
        backgroundColor: "#0747A6",
        '&:hover': {
            backgroundColor: "#0747A6",
        }
    }
}));

export default CategoryLister
