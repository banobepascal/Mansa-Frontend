import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { ArrowBack } from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';
import { categories, Category } from '../../../../data/category';
import { observer } from 'mobx-react';
import { useStore } from '../../../../store/useStore';
import { Link, Grid } from '@material-ui/core';
import { Loader } from 'rsuite';


interface AppProps {
    showMain(): void;
}

const ListChild = (props: AppProps) => {
    const { showMain } = props;
    const store = useStore();
    const {categoryMenuProducts, loading, error, menuCategory} = store.categoriesStore;

    return (
        <div>
            <List>
                <ListItem button style={{paddingLeft: "36px"}} onClick={showMain}>
                    <ListItemIcon style={{minWidth: "30px"}}>
                        <ArrowBack fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>
                        <Typography variant="body2" style={{fontWeight: 600}}>MAIN MENU</Typography>
                    </ListItemText>
                </ListItem> 

                <ListItem button style={{paddingLeft: "36px"}}>
                    <ListItemText>
                        <Typography variant="body2" style={{fontWeight: 600, color: "#000", textTransform: "capitalize"}}>
                            <Link href={`/category/type/${menuCategory.id}`} style={{textDecoration: "none", color: "inherit"}}>
                                {menuCategory.title}
                            </Link>
                        </Typography>
                    </ListItemText>
                </ListItem>

                {loading === true ?
                    <Loader center size="md" /> 
                :  error ?
                <Grid item style={{textAlign: "center"}}>
                    <Typography>{error}</Typography>
                </Grid>
                :
                <div>
                    {categoryMenuProducts.map((product) => {
                        return (
                            <div>
                                <ListItem button  style={{paddingLeft: "36px", minWidth: 0, overflow: "hidden"}}>
                                    <ListItemText>
                                            <Typography variant="body2" style={{textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden", textTransform: "capitalize", color: "#000"}}>
                                                <Link href={`/product/${product.id}`} style={{textDecoration: "none", color: "inherit"}}>
                                                    {product.title}
                                                </Link>
                                            </Typography>
                                    </ListItemText>
                                </ListItem>
                            </div>
                        )
                    })}     
                </div>
                }
            </List>
        </div>
    )
}

export default observer(ListChild);
