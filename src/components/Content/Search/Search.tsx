import React, {useEffect, useState} from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Grid, Typography, Link } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import FilterTopBar from '../../Common/FilterTopBar';
import ProductContainer from '../../Common/Product/ProductContainer';
import { ProductFilterLayout,
    FilterCategorySideBar, ProductLayout } from '../../Common/Product/ProductFilterLayout';
import FilterGroup from '../Categories/Category/Components/FilterGroup';
import DrawerTopBar from '../../Common/DrawerTopBar';
import { electronics } from '../../../data/filters';
import { useStore } from '../../../store/useStore';
import { observer } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

interface AppProps extends RouteComponentProps {
    openSignin(value: string): void;
}

const Search = (props: AppProps) => {
    const classes = useStyles();
    const store = useStore();
    const {
        products,
        showSearchedProducts,
        cachedFilteredProducts,
        filteredArrayOfProducts,
        filterSearchProducts
    } = store.searchStore;
    const {openSignin, location} = props
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState<string>("");

    useEffect(() => {
        const query = new URLSearchParams(location.search).get('q');
        if (query) {
            if (cachedFilteredProducts.length < 1 && products.length < 1) {
                setSearchQuery(query)
                showSearchedProducts(query);
            }
    
            if (cachedFilteredProducts.length > 0) {
                setSearchQuery(query)
                filterSearchProducts(cachedFilteredProducts)
            }
        }

        if (!query) {
            window.location.href =  window.location.origin
        }
    }, [cachedFilteredProducts, filterSearchProducts, location, products, showSearchedProducts]);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const container = window !== undefined ? () => window.document.body : undefined;

    return (
        <div className={classes.root}>
            <ProductFilterLayout>
                <FilterCategorySideBar>
                    <FilterGroup title="Search Filters" filters={electronics} groupType="search" />
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
                                    <FilterGroup title="Category"  filters={electronics} groupType="search" />
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
                                    <FilterGroup title="Category" filters={electronics} groupType="search" />
                                </div>
                            </div>
                        </Drawer>
                        </Hidden>
                    </div>
                </div>

                <ProductLayout>
                    <Grid container direction="column" spacing={2}>
                        <Grid item style={{marginTop: 10}}>
                            <FilterTopBar 
                                toggler={handleDrawerToggle}
                                productCount={products.length}
                                query={searchQuery}
                                type="search"
                            />
                        </Grid>

                        <Grid item style={{marginTop: 40}}>
                            <Grid container direction="column" spacing={6}>

                                { cachedFilteredProducts.length > 0 ? filteredArrayOfProducts.map((product, index) => {
                                    return (
                                        <Grid item style={{borderBottom: "1px solid #EBECF0"}} key={index}> 
                                            <Link 
                                                href={`/product/${product.id}`}
                                                style={{textDecoration: "none", color: "inherit", cursor: "pointer"}}>
                                                <ProductContainer 
                                                    type="column"
                                                    id="/category"
                                                    product={product}
                                                />
                                            </Link> 
                                        </Grid>
                                    )
                                }) : products.map((product, index) => {
                                        return (
                                            <Grid item style={{borderBottom: "1px solid #EBECF0"}} key={index}> 
                                                <Link 
                                                    href={`/product/${product.id}`}
                                                    style={{textDecoration: "none", color: "inherit", cursor: "pointer"}}>
                                                    <ProductContainer 
                                                        type="column"
                                                        id="/category"
                                                        product={product}
                                                    />
                                                </Link> 
                                            </Grid>
                                        )
                                    }) 
                                }
                            </Grid>      
                        </Grid>

                        { products.length > 23 ? <Grid item style={{marginBottom: 40, marginTop: 50}}>
                            <Grid container direction="row" justify="center">
                                <Pagination count={10} variant="outlined" color="primary" className={classes.pagination} />
                            </Grid>
                        </Grid> : null }
                    </Grid>
                </ProductLayout>
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

export default withRouter(observer(Search));

