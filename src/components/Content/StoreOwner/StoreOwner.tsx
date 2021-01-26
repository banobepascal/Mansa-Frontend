import React, {useState, useEffect} from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import FilterTopBar from '../../Common/FilterTopBar';
import ProductContainer from '../../Common/Product/ProductContainer';
import { useStore } from '../../../store/useStore';
import { observer } from 'mobx-react';
import { Loader } from 'rsuite';
import CommonStyles from '../../Common/CustomStyles';


interface AppProps {
    window?(): any;
    openSignin(value: string): void;
}

const StoreOwner = (props: AppProps) => {
    const classes = useStyles();
    const commonClass = CommonStyles();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };


    return (
        <div className={classes.root}>
            <Grid container direction="column" spacing={2}>
                <Grid item>
                    <Typography variant="h4" style={{fontWeight: 600}}>Store Owner</Typography>
                </Grid>

                <Grid item>
                    <FilterTopBar toggler={handleDrawerToggle} productCount={0}/>
                </Grid>

            
                <Grid item>
                    <Grid container direction="row" spacing={4} className={commonClass.productsTwo}>
                        {/* { favoriteProducts.map((product) => {
                            return (
                                <Grid item xs={3}>
                                    <Grid>
                                        <ProductContainer 
                                            image={product.productImages[0]} 
                                            name={product.title}
                                            price={product.price}
                                            status={parseInt(product.quantityAvailable)}
                                            id={product.id}
                                        />
                                    </Grid>   
                                </Grid>
                            )
                        }) } */}
                    </Grid>      
                </Grid>

                {/* { favoriteProducts.length > 23 ?
                <Grid item style={{marginBottom: 20, marginTop: 40}}>
                    <Grid container direction="row" justify="center">
                        <Pagination count={10} variant="outlined" color="primary" className={classes.pagination} />
                    </Grid>
                </Grid>
                : null } */}
            </Grid>
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        // padding: 40
    },

    products: {
        // display: "grid",
        // gridTemplateColumns: "repeat(4, 1fr)",
        [theme.breakpoints.down(768)]: {
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gridGap: 26,
            padding: 16,
		
            "& .MuiGrid-item": {
                minWidth: "100%",
                padding: 0
            }
        },
        
         [theme.breakpoints.down(450)]: {
         gridGap: 16
         }
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
export default observer(StoreOwner)
