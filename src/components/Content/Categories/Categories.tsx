import React, {useState, useEffect} from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import Departments from './Components/Departments';
import FilterTopBar from '../../Common/FilterTopBar';
import ProductContainer from '../../Common/Product/ProductContainer';
import { ProductFilterLayout, FilterCategorySideBar, ProductLayout } from '../../Common/Product/ProductFilterLayout';
import DrawerTopBar from '../../Common/DrawerTopBar';
import { useStore } from '../../../store/useStore';
import { observer } from 'mobx-react';
import { Loader } from 'rsuite';
import CommonStyles from '../../Common/CustomStyles';


interface AppProps {
    window?(): any;
    openSignin(value: string): void;
}

const Categories = (props: AppProps) => {
    const classes = useStyles();
    const commonClass = CommonStyles();
    const {window, openSignin} = props
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);
    const store = useStore();
    const {products, loading, errorMessage, showAllProducts} = store.productsStore;
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const container = window !== undefined ? () => window().document.body : undefined;

    useEffect(() => {
        showAllProducts();
    }, [showAllProducts]);

    return (
        <div className={classes.root}>
            <ProductFilterLayout>
                <FilterCategorySideBar>
                    <Departments />
                </FilterCategorySideBar>

                <div className={classes.drawer}>
                    <div>
                        <Hidden smUp implementation="css">
                        <Drawer
                            container={container}
                            variant="temporary"
                            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                            open={mobileOpen}
                            onClose={handleDrawerToggle}
                            classes={{
                            paper: classes.drawerPaper,
                            }}
                            ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                            }}
                        >
                            <div>
                                <div>
                                    <DrawerTopBar handleClose={handleDrawerToggle} openSignin={openSignin}/>
                                </div>
                                <div className={classes.filterStyles}>
                                    <Departments />
                                </div>
                            </div>
                        </Drawer>
                        </Hidden>
                    </div>

                    <div>
                        <Hidden xsDown implementation="css">
                        <Drawer
                            classes={{
                            paper: classes.drawerPaper,
                            }}
                            variant="permanent"
                            open
                        >
                            <div>
                                <div>
                                    <DrawerTopBar handleClose={handleDrawerToggle} openSignin={openSignin}/>
                                </div>
                                <div className={classes.filterStyles}>
                                    <Departments />
                                </div>
                            </div>
                        </Drawer>
                        </Hidden>
                    </div>
                </div>

                {loading === true ?
                    <Loader center size="md" /> 
                :
                <ProductLayout>
                    { errorMessage ?
                        <Grid item style={{textAlign: "center"}}>
                            <Typography>{errorMessage}</Typography>
                        </Grid>
                    :
                    <Grid container direction="column" spacing={2}>
                        <Grid item>
                            <Typography variant="h4" style={{fontWeight: 600}}>Products</Typography>
                        </Grid>

                        <Grid item>
                            <FilterTopBar toggler={handleDrawerToggle} productCount={products.length}/>
                        </Grid>

                        <Grid item>
                            <Grid container direction="row" className={commonClass.products}>
                                { products.map((product) => {
                                    return (
                                        <Grid item xs={4}>
                                            <Grid>
                                                <ProductContainer 
                                                    product={product}
                                                />
                                            </Grid>   
                                        </Grid>
                                    )
                                }) }
                            </Grid>      
                        </Grid>
                        { products.length > 23 ?
                        <Grid item style={{marginBottom: 20, marginTop: 40}}>
                            <Grid container direction="row" justify="center">
                                <Pagination count={10} variant="outlined" color="primary" className={classes.pagination} />
                            </Grid>
                        </Grid>
                        : null }
                    </Grid>
                    }
                </ProductLayout>
                }
            </ProductFilterLayout>
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        // padding: 40
    },

    filterStyles: {
        padding: "1rem 36px",
    },

    drawerPaper: {
        width: 365,
        border: "none",
        backgroundColor: '#fff',
    },

    drawer: {
        display: 'none', 
        [theme.breakpoints.up('sm')]: {
            width: 240,
            flexShrink: 0, 
        },
        [theme.breakpoints.down('md')]: {  
            display: 'none', 
        }
    },
    pagination: {
        color: "",
        '& .MuiPaginationItem-outlined': {
            border: "1px solid #15141b",
            '&:hover': {
              color: "#fff",
              backgroundColor: "#15141b"
          }
        },
  
        '& .MuiPaginationItem-outlinedPrimary.Mui-selected': {
          backgroundColor: "#15141b",
          color: "#fff"
        }
      },
}));
export default observer(Categories)
