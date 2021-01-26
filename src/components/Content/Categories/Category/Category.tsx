import React, {useState, useEffect} from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import FilterTopBar from '../../../Common/FilterTopBar';
import ProductContainer from '../../../Common/Product/ProductContainer';
import { ProductFilterLayout, FilterCategorySideBar, 
    ProductLayout } from '../../../Common/Product/ProductFilterLayout';
import FilterGroup from './Components/FilterGroup';
import DrawerTopBar from '../../../Common/DrawerTopBar';
import { useStore } from '../../../../store/useStore';
import { observer } from 'mobx-react';
import { Loader } from 'rsuite';
import ReactMarkdownWithHtml from 'react-markdown/with-html';
import { electronics } from '../../../../data/filters';
import { RouteComponentProps, withRouter } from 'react-router-dom';


interface AppProps extends RouteComponentProps {
    window?(): any;
    openSignin(value: string): void;
}

const Category = (props: AppProps) => {
    const classes = useStyles();
    const {window, openSignin} = props
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);
    const store = useStore();
    const { categoryProducts, loading, error,
        category, getCategoryProducts, filterProducts,
        cachedFilteredProducts, filteredArrayOfProducts} = store.categoriesStore
    
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    
    useEffect(() => {
        if (cachedFilteredProducts.length < 1 && categoryProducts.length < 1) {
            getCategoryProducts();
        }

        if (cachedFilteredProducts.length > 0) {
            filterProducts(cachedFilteredProducts)
        }
    }, [getCategoryProducts, filterProducts, cachedFilteredProducts, categoryProducts]);

    const container = window !== undefined ? () => window().document.body : undefined;


    return (
        <div className={classes.root}>
            <ProductFilterLayout>
                <FilterCategorySideBar>
                    <FilterGroup title={category.title} filters={electronics} groupType="category" />
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
                                    <FilterGroup title={category.title} filters={electronics} groupType="category" />
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
                                    <FilterGroup title={category.title} filters={electronics} groupType="category" />
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
                    { error ?
                        <Grid item style={{textAlign: "center"}}>
                            <Typography>{error}</Typography>
                        </Grid>
                    :
                    <Grid container direction="column" spacing={2} style={{flexWrap: "nowrap"}}>
                            <Grid item>
                                <Grid container direction="column">
                                    <Grid item>
                                        <Typography variant="h4" style={{fontWeight: 600, textTransform: "capitalize"}}>{category.title}</Typography>
                                    </Grid>
    
                                    <Grid item>
                                    <ReactMarkdownWithHtml children={category.description} allowDangerousHtml/>
                                    </Grid>
                                </Grid>       
                            </Grid>
                     
                        {/* <Grid item style={{marginTop: 40, borderTop: "1px solid #EBECF0"}}>
                            <Grid style={{padding: "1.6rem 0"}}>
                                <Carousel label="SHOP BY CATEGORY" status={0} />
                            </Grid>
                        </Grid> */}

                        <Grid item style={{marginTop: 40}}>
                            <FilterTopBar 
                                toggler={handleDrawerToggle} 
                                productCount={cachedFilteredProducts.length > 0  ? filteredArrayOfProducts.length: categoryProducts.length}
                                query={category.title}
                                type="category"
                            />
                        </Grid>

                        <Grid item>
                            <Grid container direction="row" spacing={4} className={classes.products}>
                                { cachedFilteredProducts.length > 0 ? filteredArrayOfProducts.map((product, index) => {
                                    return (
                                        <Grid item xs={4} key={index}>
                                            <Grid>
                                                <ProductContainer 
                                                    product={product}
                                                />
                                            </Grid>   
                                        </Grid>
                                    )
                                }) : categoryProducts.map((product, index) => {
                                        return (
                                            <Grid item xs={4} key={index}>
                                                <Grid>
                                                    <ProductContainer
                                                        product={product}
                                                    />
                                                </Grid>   
                                            </Grid>
                                        )
                                    }) 
                                }
                            </Grid>      
                        </Grid>
                        
                        { categoryProducts.length > 23 || filteredArrayOfProducts.length > 23 ? 
                            <Grid item style={{marginBottom: 40, marginTop: 40}}>
                                <Grid container direction="row" justify="center">
                                    <Pagination count={10} variant="outlined" color="primary" className={classes.pagination} />
                                </Grid>
                            </Grid>
                        : null} 
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
    products: {
        [theme.breakpoints.down(768)]: {
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",

            "& .MuiGrid-item": {
                minWidth: "100%"
            }
        },
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

export default  withRouter(observer(Category));