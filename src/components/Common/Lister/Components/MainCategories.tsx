import React, {useEffect} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { ArrowForwardIos } from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';
import { ListItemSecondaryAction, Link} from '@material-ui/core';
import { Category } from '../../../../data/category';
import { observer } from 'mobx-react';
import { useStore } from '../../../../store/useStore';


interface AppProps {
    showNest(id: string): void;
    categories: any[];
}

const MainCategories = (props: AppProps) => {
    const { showNest, categories } = props;

    return (
        <div>
            <List>
                <ListItem button style={{paddingLeft: "36px"}}>
                    <ListItemText>
                        <Typography style={{fontWeight: 600}}>SHOP BY CATEGORY</Typography>
                    </ListItemText>
                </ListItem>
                {categories.map((category) => {
                        return (
                            <ListItem button style={{paddingLeft: "36px"}} onClick={() => showNest(category.id)}>
                                <ListItemText>
                                    <Typography variant="body2" style={{textTransform: "capitalize"}}>{category.title}</Typography>
                                </ListItemText>
                                <ListItemSecondaryAction style={{right: "20px"}}>
                                    <ArrowForwardIos fontSize="small" style={{fontSize: 13}} />
                                </ListItemSecondaryAction>
                            </ListItem>
                        )
                })}      
            </List>
        </div>
    )
}

export default observer(MainCategories);
